---
title: Python FastAPI框架配合SQLAlchemy操作Mysql数据库 增删改查
reprint: false
date: 2023-02-24 19:54:10
categories:
  - Code
tags:
  - FastAPI
  - SQLAlchemy
cover:
coverWidth:
coverHeight:
---

FastAPI可以使用任何您想要的关系型数据库。

在这里，让我们看一个使用SQLAlchemy的示例。

您可以很容易地将SQLAlchemy支持任何数据库，像：

* PostgreSQL
* MySQL
* SQLite
* Oracle
* SQL Server
* 等等其它数据库

在此示例中，我们将使用MySQL。

对于您的产品级别的应用程序，您可能会要使用像PostgreSQL这样的数据库服务器。

## 创建MySQL数据库

创建test数据库，数据库创建users表和items表

```sql
# users表
CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

# items表
CREATE TABLE `items`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`owner_id`) USING BTREE,
  CONSTRAINT `user_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;
```

## 测试项目文件结构

对于这些示例，假设你有一个名为sql_app的目录，其结构如下：

```tree
sql_app
├── crud.py
├── database.py
├── main.py
├── models.py
└── schemas.py
```

`__init__.py`只是一个空文件，但它告诉`Python`其中`sql_app`的所有模块（Python 文件）都是一个包。

## 数据库配置database.py

```python
# 1、导入 SQLAlchemy 部件
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
# 连接mysql数据库需要导入pymysql模块
import pymysql
pymysql.install_as_MySQLdb()

# 2、为 SQLAlchemy 定义数据库 URL地址
# 配置数据库地址：数据库类型+数据库驱动名称://用户名:密码@机器地址:端口号/数据库名
SQLALCHEMY_DATABASE_URL = "mysql://root:root@127.0.0.1:3306/test"

# 3、创建 SQLAlchemy 引擎
engine = create_engine(SQLALCHEMY_DATABASE_URL, encoding='utf-8')


# 4、创建数据库会话
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5、创建一个Base类declarative_base
# 稍后我们将用这个类继承，来创建每个数据库模型或类（ORM 模型）
Base = declarative_base()
```

## 创建数据库模型models.py

用`Base`类来创建`SQLAlchemy`模型

我们将使用我们之前创建的`Base`类来创建`SQLAlchemy`模型。

> SQLAlchemy使用的“模型”这个术语 来指代与数据库交互的这些类和实例。
> 而Pydantic也使用“模型”这个术语 来指代不同的东西，即数据验证、转换以及文档类和实例。

```python
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

# 1、从database.py导入Base类
from .database import Base

# User继承Base类
class User(Base):
    # 表名
    __tablename__ = "users"

    # 2、创建模型属性/列，使用Column来表示 SQLAlchemy 中的默认值。
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    # 3、创建关系
    # 当访问 user 中的属性items时，如 中my_user.items，它将有一个ItemSQLAlchemy 模型列表（来自items表），这些模型具有指向users表中此记录的外键
    # 当您访问my_user.items时，SQLAlchemy 实际上会从items表中的获取一批记录并在此处填充进去。
    # 同样，当访问 Item中的属性owner时，它将包含表中的UserSQLAlchemy 模型users。使用owner_id属性/列及其外键来了解要从users表中获取哪条记录。
    items = relationship("Item", back_populates="owner")

# Item继承Base类
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")
```

创建关系

```python
items = relationship("Item", back_populates="owner")
```

* 当访问`user`中的属性`items`时，如`my_user.items`，它将有一个`ItemSQLAlchemy`模型列表（来自`items`表），这些模型具有指向`users`表中此记录的外键
* 当您访问`my_user.items`时，`SQLAlchemy`实际上会从`items`表中的获取一批记录并在此处填充进去。
* 同样，当访问`Item`中的属性`owner`时，它将包含表中的`UserSQLAlchemy`模型`users`。使用`owner_id`属性/列及其外键来了解要从`users`表中获取哪条记录。

## 创建Pydantic模型schemas.py

现在让我们查看一下文件`sql_app/schemas.py`。

为了避免`SQLAlchemy`模型和`Pydantic`模型之间的混淆，我们将有`models.py`（`SQLAlchemy`模型的文件）和`schemas.py`（`Pydantic`模型的文件）。

这些`Pydantic`模型或多或少地定义了一个`schema`（一个有效的数据形状）。

因此，这将帮助我们在使用两者时避免混淆。

创建初始`Pydantic`模型/模式¶

创建一个`ItemBase`和`UserBasePydantic`模型（或者我们说`schema`）以及在创建或读取数据时具有共同的属性。

`ItemCreate`为创建一个`UserCreate`继承自它们的所有属性（因此它们将具有相同的属性），以及创建所需的任何其他数据（属性）。

因此在创建时也应当有一个`password`属性。

但是为了安全起见，`password`不会出现在其他同类`Pydantic`模型中，例如用户请求时不应该从`API`返回响应中包含它。

```python
from typing import List, Union

# 1、创建初始 Pydantic模型/模式
from pydantic import BaseModel

# 1、创建初始 Pydantic模型/模式
class ItemBase(BaseModel):
    title: str
    description: Union[str, None] = None

# 1、创建初始 Pydantic模型/模式
class ItemCreate(ItemBase):
    pass

# 2、创建用于读取/返回的Pydantic模型/模式
class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

# 1、创建初始 Pydantic模型/模式
class UserBase(BaseModel):
    email: str

# 1、创建初始 Pydantic模型/模式
class UserCreate(UserBase):
    password: str

# 2、创建用于读取/返回的Pydantic模型/模式
class User(UserBase):
    id: int
    is_active: bool
    items: List[Item] = []

    class Config:
        orm_mode = True
```

请注意，读取用户（从`API`返回）时将使用不包括`password`的`User Pydantic`模型。

### `SQLAlchemy`风格和`Pydantic`风格

请注意，`SQLAlchemy`模型使用`=`来定义属性，并将类型作为参数传递给`Column`，例如：

```python
name = Column(String)
```

虽然`Pydantic`模型使用: 声明类型，但新的类型注释语法/类型提示是：

```python
name: str
```

请牢记这一点，这样您在使用`:`还是`=`时就不会感到困惑。

## CRUD工具crud.py

从`sqlalchemy.orm`中导入`Session`，这将允许您声明`db`参数的类型，并在您的函数中进行更好的类型检查和完成。

导入之前的`models`（`SQLAlchemy`模型）和`schemas`（`Pydantic`模型/模式）。

```python
from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# 通过 ID 和电子邮件查询单个用户
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

# 查询多个用户
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    # 使用您的数据创建一个 SQLAlchemy 模型实例。
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    # 使用add来将该实例对象添加到您的数据库。
    db.add(db_user)
    # 使用commit来对数据库的事务提交（以便保存它们）。
    db.commit()
    # 使用refresh来刷新您的数据库实例（以便它包含来自数据库的任何新数据，例如生成的 ID）。
    db.refresh(db_user)
    return db_user

# 查询多个项目
def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
```

## 主FastAPI应用程序main.py

```python
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

# 1、创建数据库表
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# 2、创建依赖项
# Dependency
def get_db():
    # 我们需要每个请求有一个独立的数据库会话/连接（SessionLocal），
    # 在所有请求中使用相同的会话，然后在请求完成后关闭它。
    db = SessionLocal()
    # 我们的依赖项将创建一个新的 SQLAlchemy SessionLocal，
    # 它将在单个请求中使用，然后在请求完成后关闭它。
    try:
        yield db
    finally:
        db.close()

# 4、创建您的FastAPI 路径操作
# 3、db: Session = Depends(get_db) ：当在路径操作函数中使用依赖项时，我们使用Session，直接从 SQLAlchemy 导入的类型声明它。
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

# 4、创建您的FastAPI 路径操作
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# 4、创建您的FastAPI 路径操作
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# 4、创建您的FastAPI 路径操作
@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

# 4、创建您的FastAPI 路径操作
@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items
```

## 关于`def`对比`async def`

在这里，我们在路径操作函数和依赖项中都使用着`SQLAlchemy`模型，它将与外部数据库进行通信。

这会需要一些“等待时间”。

但是由于`SQLAlchemy`不具有`await`直接使用的兼容性，因此类似于：

```python
user = await db.query(User).first()
```

…相反，我们可以使用：

```python
user = db.query(User).first()
```

然后我们应该声明路径操作函数和不带依赖关系的`async def`，只需使用普通的`def`，如下：

```python
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    ...
```

> 如果您需要异步连接到关系数据库，请参阅[Async SQL (Relational) Databases](https://fastapi.tiangolo.com/zh/advanced/async-sql-databases/)
> 如果您很好奇并且拥有深厚的技术知识，您可以在[Async](https://fastapi.tiangolo.com/zh/async/#very-technical-details)文档中查看有关如何处理`async def`于`def`差别的技术细节。

在`sql_app`目录执行

```bash
uvicorn main:app --reload
```
