# 餐廳清單
此專案需註冊登入後，提供查詢、瀏覽餐廳資訊

## 功能介紹
 - 有註冊、登入頁面，需登入才可使用功能
 - 可用FACEBOOK登入
 - 依照餐廳名稱及類別搜尋
 - 可瀏覽每間餐廳類別、地址、電話、評分、圖片及 Google Map相關資訊
 - 可新增一家餐廳
 - 可修改餐廳詳細資訊
 - 可刪除餐廳
 - 搜尋可依選單類別排序
 - 可按登出鍵登出

## 專案畫面

![首頁](https://github.com/stu96534/restaurant_list/blob/main/public/首頁.png)

## 安裝
1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/stu96534/restaurant_list.git
```

2.cd 至本專案資料夾:

```
cd restaurant_list
```

3.下載套件:

```
npm install
```

4.下載種子資料:

```
npm run seed
```

5.啟動程式:

```
npm run dev
```
## 開發工具
### window 10
 - Visual Studio Code - 開發環境
 - Node.js 版本 16.15.0- 伺服器
 - express 版本 4.16.4- 開發框架
 - express-handlebars 版本 3.0.0 - 樣板引擎
 - express-session 版本 1.17.1- 驗證機制
 - mongoose 版本 5.9.7 -資料庫
 - passport 版本 0.4.1 - 使用者認證
 - passport-local 版本 1.0.0 - 本地策略
 - passport-facebook 版本 3.0.0 - FACEBOOK策略
 - bcrypt 版本 2.4.3 - 雜湊演算法
 - connect-flash 版本 0.0.1 - 使用者提示
 - dotenv 版本 8.2.0 - 
 
 ## 新增功能
 ### 註冊(可使用facebook註冊)
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增.png)
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增2.png)
 ### 登入(可使用facebook登入)
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增.png)
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增2.png)
 ### 登出
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增.png)
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增2.png)
 ### 新增一家餐廳
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增.png)
 ![新增](https://github.com/stu96534/restaurant_list/blob/main/public/新增2.png)
 ### 可按Detail及圖片，瀏覽餐廳詳細資訊
 ![詳細資料](https://github.com/stu96534/restaurant_list/blob/main/public/詳細資料.png)
 ![詳細資料](https://github.com/stu96534/restaurant_list/blob/main/public/詳細資料2.png)
 ### 可按Edit，修改餐廳詳細資訊
 ![修改](https://github.com/stu96534/restaurant_list/blob/main/public/修改.png)
 ![修改](https://github.com/stu96534/restaurant_list/blob/main/public/修改2.png)
 ### 可按Delete，刪除餐廳
 ![刪除](https://github.com/stu96534/restaurant_list/blob/main/public/刪除.png)
 ### 可按選單，選擇餐廳排列類別
 ![選單](https://github.com/stu96534/restaurant_list/blob/main/public/排序.png)
