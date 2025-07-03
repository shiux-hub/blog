<!-- 全局播放器 -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getMusicList } from '@/api'
import { useData } from '@/composables/data'
import { mainStore } from '@/store'
import 'aplayer/dist/APlayer.min.css'

const store = mainStore()
const { theme } = useData()
const { enable, url, id, server, type } = theme.value.music
const { playerShow, playerVolume, playState, playerData } = storeToRefs(store)

// APlayer
const player = ref(null)
const playerDom = ref(null)

// 获取播放列表
async function getMusicListData() {
  try {
    const musicList = await getMusicList(url, id, server, type)
    console.log(musicList)
    initAPlayer(musicList?.length ? musicList : [])
  }
  catch {
    window.$message.error('获取播放列表失败，请重试')
    initAPlayer([])
  }
}

// 初始化播放器
async function initAPlayer(list) {
  try {
    const playlist = [...list]
    if (!playlist?.length)
      return false
    const module = await import('aplayer')
    const APlayer = module.default
    player.value = new APlayer({
      container: playerDom.value,
      volume: playerVolume.value,
      lrcType: 3,
      listFolded: true,
      order: 'random',
      audio: playlist,
    })
    console.info('🎵 播放器挂载完成', player.value)
    // 播放器事件
    player.value?.on('canplay', () => {
      // 更新信息
      getMusicData()
    })
    player.value?.on('play', () => {
      console.log('开始播放')
      playState.value = true
    })
    player.value?.on('pause', () => {
      console.log('暂停播放')
      playState.value = false
    })
    getMusicData()
    // 挂载播放器
    window.$player = player.value
  }
  catch (error) {
    console.error('初始化播放器出错：', error)
  }
}

// 获取当前播放歌曲信息
function getMusicData() {
  try {
    if (!playerDom.value)
      return false
    const songInfo = playerDom.value.querySelector('.aplayer-info')
    // 歌曲信息
    const songName = songInfo.querySelector('.aplayer-title').textContent
    const songArtist = songInfo
      .querySelector('.aplayer-author')
      .textContent
      .replace(' - ', '')
    console.log(songName, songArtist)
    // 更新信息
    playerData.value = {
      name: songName || '未知曲目',
      artist: songArtist || '未知艺术家',
    }
    // 更新媒体信息
    initMediaSession(playerData.value?.name, playerData.value?.artist)
  }
  catch (error) {
    console.error('获取播放信息出错：', error)
  }
}

// 初始化媒体会话控制
function initMediaSession(title, artist) {
  if ('mediaSession' in navigator) {
    // 歌曲信息
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist })
    // 按键关联
    navigator.mediaSession.setActionHandler('play', () => {
      player.value?.play()
    })
    navigator.mediaSession.setActionHandler('pause', () => {
      player.value?.pause()
    })
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      player.value?.skipBack()
    })
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      player.value?.skipForward()
    })
  }
}

// 监听播放器开启状态
watch(
  () => playerShow.value,
  (val) => {
    if (!val)
      return false
    player.value?.destroy()
    getMusicListData()
  },
)

// 监听播放器音量变化
watch(
  () => playerVolume.value,
  (val) => {
    player.value?.volume(val, true)
  },
)

onMounted(() => {
  if (window.innerWidth >= 768 && playerShow.value && enable)
    getMusicListData()
})

onBeforeUnmount(() => {
  player.value?.destroy()
})
</script>

<template>
  <div
    v-if="playerShow"
    class="player"
    :class="[{ playing: playState }]"
    @click="player?.toggle()"
  >
    <div ref="playerDom" class="player-content" />
  </div>
</template>

<style scoped>
.player {
  block-size: 42px;
  margin-block-start: 12px;
  cursor: pointer;
  transition: transform 0.3s;

  .player-content {
    inline-size: fit-content;
    margin: 0;
    overflow: hidden;
    color: var(--color-font-color);
    background-color: var(--color-card-background);
    border: 1px solid var(--color-card-border);
    border-radius: 50px;
    box-shadow: 0 6px 10px -4px var(--color-dark-shadow);
    transition: all 0.3s;

    :deep(.aplayer-body) {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 6px;
      padding-inline-end: 12px;
      pointer-events: none;

      .aplayer-pic {
        z-index: 2;
        inline-size: 30px;
        min-inline-size: 30px;
        block-size: 30px;
        margin-inline-end: 8px;
        border-radius: 50%;
        outline: 1px solid var(--color-card-border);
        animation: rotate 20s linear infinite;
        animation-play-state: paused;

        .aplayer-button {
          display: none;
        }
      }

      .aplayer-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        block-size: auto;
        padding: 0;
        margin: 0;
        border: none;

        .aplayer-music {
          z-index: 2;
          display: flex;
          block-size: auto;
          padding: 0;
          margin: 0;
          line-height: normal;

          .aplayer-title {
            display: inline-block;
            max-inline-size: 120px;
            overflow: hidden;
            line-height: normal;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .aplayer-author {
            display: none;
          }
        }

        .aplayer-lrc {
          z-index: 2;
          inline-size: 0;
          margin: 0;
          margin-inline-start: 12px;
          opacity: 0%;
          transition:
            inline-size 0.3s,
            opacity 0.3s;

          &::before,
          &::after {
            display: none;
          }

          .aplayer-lrc-contents {
            p {
              color: var(--color-card-background);
              text-align: center;
              filter: blur(0.8px);
              transition:
                filter 0.3s,
                opacity 0.3s;

              &.aplayer-lrc-current {
                filter: blur(0);
              }
            }
          }
        }

        .aplayer-controller {
          position: absolute;
          inset-block-start: 0;
          inset-inline-start: 0;
          z-index: 0;
          inline-size: 100%;
          block-size: 100%;

          .aplayer-time {
            display: none;
          }

          .aplayer-bar-wrap {
            padding: 0;
            margin: 0;
            opacity: 0%;
            transition: opacity 0.3s;

            .aplayer-bar {
              block-size: 100%;
              background: transparent;

              .aplayer-loaded {
                display: none;
              }

              .aplayer-played {
                block-size: 100%;
                background: var(--color-white) !important;
                transition: inline-size 0.3s;
              }
            }
          }
        }
      }

      .aplayer-notice,
      .aplayer-miniswitcher {
        display: none;
      }
    }

    :deep(.aplayer-list) {
      display: none;
    }

    &:hover {
      border-color: var(--color-theme);
      box-shadow: 0 8px 16px -4px var(--color-theme-op);

      &::after {
        opacity: 100%;
      }
    }

    &::after {
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      inline-size: 100%;
      block-size: 100%;
      font-size: 14px;
      color: var(--color-card-background);
      pointer-events: none;
      content: '播放音乐';
      background-color: var(--color-theme);
      opacity: 0%;
      transition: opacity 0.3s;
    }
  }

  &.playing {
    .player-content {
      color: var(--color-card-background);
      background-color: var(--color-theme);
      border: 1px solid var(--color-theme);

      :deep(.aplayer-body) {
        .aplayer-pic {
          animation-play-state: running;
        }

        .aplayer-info {
          .aplayer-lrc {
            inline-size: 200px;
            opacity: 100%;
          }

          .aplayer-controller {
            .aplayer-bar-wrap {
              opacity: 100%;
            }
          }
        }
      }

      &::after {
        opacity: 0%;
      }
    }
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    display: none;
  }
}
</style>
