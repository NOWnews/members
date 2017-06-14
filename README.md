# NOWmembers

提供會員註冊，登入等相關功能的 API 端點

## NOWmembers 端點

### `GET` /api/member

取得Member Profile

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Member | token | String | √ | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxva2kwMTE5QGdtYWlsLmNvbSIsImV4cGlyZUF0IjoiMjAxNy0wNi0xNCAxOToxNDo1MSIsImlhdCI6MTQ5NzQzNTI5MSwiZXhwIjoxNDk3NDM4ODkxfQ.yxA4_Ib0lNDVicCGs6D8V2Qpt_b_lvZ_W74sXtjjnm0` |

#### Response Status Code

200

#### Response Data

```
{
"id": "21ae3126-35ff-423d-bb3e-bb9e0c8154db",
"googleId": "113686552403510801746",
"email": "loki0119@gmail.com",
"name": "CyrilYu",
"__v": 0,
"updatedAt": "2017-06-14T10:30:43.532Z",
"createdAt": "2017-06-14T09:13:49.292Z",
"status": "ACTIVED",
"gender": "male"
}
```

### `PATCH` /api/member/update

更新Member個人資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Member | token | String | √ | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxva2kwMTE5QGdtYWlsLmNvbSIsImV4cGlyZUF0IjoiMjAxNy0wNi0xNCAxOToxNDo1MSIsImlhdCI6MTQ5NzQzNTI5MSwiZXhwIjoxNDk3NDM4ODkxfQ.yxA4_Ib0lNDVicCGs6D8V2Qpt_b_lvZ_W74sXtjjnm0` |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| gender | 性別 | String | √ | `MAN` |
| birthday | 生日 | String | √ | `2017-11-11` |
| phone | 電話號碼 | String | √ | `0999999999` |
| name | 姓名 | String | √ | `Cyril` |

#### Response Status Code

200

#### Response Data

```
{
"id": "21ae3126-35ff-423d-bb3e-bb9e0c8154db",
"googleId": "113686552403510801746",
"email": "loki0119@gmail.com",
"name": "CyrilYu",
"__v": 0,
"updatedAt": "2017-06-14T10:30:43.532Z",
"createdAt": "2017-06-14T09:13:49.292Z",
"status": "ACTIVED",
"gender": "male"
}
```

### `GET` /api/auth/oauth

GOOGLE帳號登入

#### Response Status Code

200

#### Response Data

```
{
  "name": "Cyirl",
  "email": "xxxx@gmail.com",
  "token": "dfajkfdkl;afjio;3jlf;kja"
}
```