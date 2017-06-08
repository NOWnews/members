# NOWmembers 會員系統

提供會員註冊，登入等相關功能的 API 端點

dev: `npm start`

test: `npm run test`

## NOWmembers 端點

### `GET` /api/member

取得會員個人資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Member | API Token | String | √ | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` |

#### Response Status Code

200

#### Response Data

```
{
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "gender": "MAN",
  "phone": "0912345567",
  "birthday": "1988-01-18"
}
```

### `PATCH` /api/member/update

更新會員個人資料

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Member | API Token | String | √ | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` |

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| name | name | String |  | `Simon` |

#### Response Status Code

200

#### Response Data

```
{
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "gender": "MAN",
  "phone": "0912345567",
  "birthday": "1988-01-18"
}
```

### `POST` /api/member/signup

註冊帳戶

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| name | 暱稱 | String | √ | `Simon` |
| email | email | String | √ | `simon.god@nownews.com` |
| password | 密碼 | String | √ | `5947788` |
| phone | 電話號碼 | String |  | `0912345567` |
| birthday | 生日 | String |  | `1988-01-18` |
| gender | 性別 | [`MALE`, `FEMALE`, `OTHER`] |  | `OTHER` |
| thirdPartyProvider | 第三方登入 | String |  | [`facebook`, `twitter`] |
| thirdPartyId | 第三方登入ID | `=` |  | `OTHER` |

#### Response Status Code

200

#### Response Data

```
{
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "gender": "MAN",
  "phone": "0912345567",
  "birthday": "1988-01-18"
}
```

### `POST` /api/member/signin

登入帳戶

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.god@nownews.com` |
| password | 密碼 | String | √ | `5947788` |

#### Response Status Code

200

#### Response Data

```
{
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "gender": "MAN",
  "phone": "0912345567",
  "birthday": "1988-01-18",
  "token": "09K5NoMxFMKYTEGEiqYizso3"
}
```

### `GET` /api/auth/active

驗證帳號

#### Query String

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| token | auth token | String |  | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` |


#### Response Status Code

200

#### Response Data

```
{ status: success }
```

### `POST` /api/auth/resend

重新驗證帳號

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.sun@nownews.com` |

#### Response Status Code

200

#### Response Data

```
{
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "gender": "MAN",
  "phone": "0912345567",
  "birthday": "1988-01-18"
}
```

### `POST` /api/member/resetPasswd

申請重設密碼

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.sun@nownews.com` |

#### Response Status Code

200

#### Response Data

```
{
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "gender": "MAN",
  "phone": "0912345567",
  "birthday": "1988-01-18"
}
```

### `PATCH` /api/member/updatePasswd

重設密碼

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| token | 驗證碼 | String | √ | `09K5QExxt4aDs0hvsiTQX7wG` |
| newPassword | 新密碼 | String | √ | `44444` |
| confirmNewPassword | 確認新密碼 | String | √ | `44444` |

#### Response Status Code

200

#### Response Data

```
{
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "gender": "MAN",
  "phone": "0912345567",
  "birthday": "1988-01-18"
}
```
