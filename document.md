# NOWmembers

提供會員註冊，登入等相關功能的 API 端點

## NOWmembers 端點

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
  "__v": 0,
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "password": "79b0041c680efbf70ffee568a5690a2a",
  "_id": "57fe6215990924126a5e8f08",
  "updatedAt": "2016-10-12T16:17:25.844Z",
  "createdAt": "2016-10-12T16:17:25.844Z",
  "status": "PENDING",
  "gender": "OTHER"
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
  "_id": "57fe626ddef43b1356c2f1a7",
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "__v": 0,
  "updatedAt": "2016-10-12T16:22:30.803Z",
  "createdAt": "2016-10-12T16:18:53.723Z",
  "status": "VERIFIED",
  "gender": "OTHER"
}
```

### `POST` /api/auth/active

驗證帳戶

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| token | 驗證碼 | String | √ | `09K4qsgAviCHjvObjd6olfRH` |

#### Response Status Code

200

#### Response Data

```
{
  "_id": "57fe626ddef43b1356c2f1a8",
  "updatedAt": "2016-10-12T16:22:30.801Z",
  "email": "simon.sun@nownews.com",
  "token": "09K5NoMxFMKYTEGEiqYizso3",
  "expireTime": "2016-10-15T16:18:53.740Z",
  "__v": 0,
  "createdAt": "2016-10-12T16:18:53.743Z",
  "status": "USED"
}
```

### `POST` /api/auth/resend

重新驗證帳戶

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.god@nownews.com` |

#### Response Status Code

200

#### Response Data

```
{
  "_id": "57fe63efdef43b1356c2f1aa",
  "updatedAt": "2016-10-12T16:25:30.428Z",
  "email": "simon.god@nownews.com",
  "token": "09K5PTZ3SjYhcOq6lqoNYbae",
  "expireTime": "2016-10-15T16:25:30.425Z",
  "__v": 0,
  "createdAt": "2016-10-12T16:25:19.223Z",
  "trashed": false,
  "status": "UNUSED"
}
```

### `POST` /api/password/reset

申請重設密碼

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.god@nownews.com` |

#### Response Status Code

200

#### Response Data

```
{
  "__v": 0,
  "updatedAt": "2016-10-12T16:28:32.638Z",
  "email": "simon.god@nownews.com",
  "token": "09K5QExxt4aDs0hvsiTQX7wG",
  "expireTime": "2016-10-15T16:28:32.637Z",
  "_id": "57fe64b0def43b1356c2f1ab",
  "createdAt": "2016-10-12T16:28:32.638Z",
  "trashed": false,
  "status": "UNUSED"
}
```

### `POST` /api/member/resetPasswd

重設密碼

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.god@nownews.com` |
| password | 新密碼 | String | √ | `44444` |

#### Response Status Code

200

#### Response Data

```
{
  "_id": "57fe63efdef43b1356c2f1a9",
  "updatedAt": "2016-10-12T16:31:12.633Z",
  "name": "Simon",
  "email": "simon.god@nownews.com",
  "password": "a2dd55fba88382d6decb24fef85a68aa",
  "__v": 0,
  "createdAt": "2016-10-12T16:25:19.219Z",
  "trashed": false,
  "status": "VERIFIED",
  "gender": "OTHER"
}
```