export interface MainState {
  themeType: 'auto' | 'light' | 'dark'
  themeValue: 'light' | 'dark'
  bannerType: 'half' | 'full'
  loadingStatus: boolean
  scrollData: {
    height: number
    percentage: number
    isScrollDown: boolean
  }
  footerIsShow: boolean
  controlShow: boolean
  searchShow: boolean
  showSettings: boolean
  playState: boolean
  playerShow: boolean
  playerVolume: number
  playerData: {
    name: string
    artist: string
  }
  mobileMenuShow: boolean
  useRightMenu: boolean
  backgroundBlur: boolean
  fontFamily: string
  fontSize: number
  infoPosition: string
  lastScrollY: number
  backgroundType: string
  backgroundUrl: string
}
