# NOWmembers

提供會員註冊，登入等相關功能的 API 端點

## NOWmembers 端點

### `POST` /api/members/signup

註冊帳戶

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Members | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsMembersNumberOne`] | √ | `request.header['X-NOWnews-Members'] = 'NOWnewsMembersNumberOne'` |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| name | 暱稱 | String | √ | `Simon` |
| email | email | String | √ | `simon.sun@nownews.com` |
| password | 密碼 | String | √ | `12344444` |
| confirmPassword | 確認密碼 | String | √ | `12344444` |
| phone | 電話號碼 | String |  | `0912345567` |
| birthday | 生日 | String |  | `1988-01-18` |
| gender | 性別 | [`MALE`, `FEMALE`, `OTHER`] |  | `OTHER` |

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "__v": 0,
  "updatedAt": "2016-10-12T16:17:25.844Z",
  "name": "Simon",
  "email": "simon.sun@nownews.com",
  "password": "79b0041c680efbf70ffee568a5690a2a",
  "_id": "57fe6215990924126a5e8f08",
  "createdAt": "2016-10-12T16:17:25.844Z",
  "trashed": false,
  "status": "PENDING",
  "gender": "OTHER"
}
```

### `POST` /api/members/signin

登入帳戶

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Members | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsMembersNumberOne`] | √ | `request.header['X-NOWnews-Members'] = 'NOWnewsMembersNumberOne'` |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.sun@nownews.com` |
| password | 密碼 | String | √ | `12344444` |

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "_id": "57fe626ddef43b1356c2f1a7",
  "updatedAt": "2016-10-12T16:22:30.803Z",
  "name": "Simon",
  "email": "simon.sun@nownews.com",
  "__v": 0,
  "createdAt": "2016-10-12T16:18:53.723Z",
  "trashed": false,
  "status": "VERIFIED",
  "gender": "OTHER"
}
```

### `POST` /api/verify/confirm

驗證帳戶

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Members | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsMembersNumberOne`] | √ | `request.header['X-NOWnews-Members'] = 'NOWnewsMembersNumberOne'` |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| token | 驗證碼 | String | √ | `09K4qsgAviCHjvObjd6olfRH` |

#### Query Parameters

None

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
  "trashed": true,
  "status": "USED"
}
```

### `POST` /api/verify/reset

重新驗證帳戶

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Members | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsMembersNumberOne`] | √ | `request.header['X-NOWnews-Members'] = 'NOWnewsMembersNumberOne'` |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.sun@nownews.com` |

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "_id": "57fe63efdef43b1356c2f1aa",
  "updatedAt": "2016-10-12T16:25:30.428Z",
  "email": "simon.sun@nownews.com",
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

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Members | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsMembersNumberOne`] | √ | `request.header['X-NOWnews-Members'] = 'NOWnewsMembersNumberOne'` |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| email | email | String | √ | `simon.sun@nownews.com` |

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "__v": 0,
  "updatedAt": "2016-10-12T16:28:32.638Z",
  "email": "simon.sun@nownews.com",
  "token": "09K5QExxt4aDs0hvsiTQX7wG",
  "expireTime": "2016-10-15T16:28:32.637Z",
  "_id": "57fe64b0def43b1356c2f1ab",
  "createdAt": "2016-10-12T16:28:32.638Z",
  "trashed": false,
  "status": "UNUSED"
}
```

### `POST` /api/password/check

確認重設密碼的 token 是否失效

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Members | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsMembersNumberOne`] | √ | `request.header['X-NOWnews-Members'] = 'NOWnewsMembersNumberOne'` |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| token | 驗證碼 | String | √ | `09KF60ivIl35RIWofnKXO3JK` |

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "_id": "5800930ea12fc4196b3341ff",
  "updatedAt": "2016-10-14T08:10:54.689Z",
  "email": "simon.sun@nownews.com",
  "token": "09KF60ivIl35RIWofnKXO3JK",
  "expireTime": "2016-10-17T08:10:54.688Z",
  "__v": 0,
  "createdAt": "2016-10-14T08:10:54.689Z",
  "trashed": false,
  "status": "UNUSED"
}
```

### `POST` /api/password/update

重設密碼

#### Header Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| X-NOWnews-Members | 驗證是否有存取 api 權限的 token，目前為固定的值 | [`NOWnewsMembersNumberOne`] | √ | `request.header['X-NOWnews-Members'] = 'NOWnewsMembersNumberOne'` |

#### Url Parameters

None

#### Body Parameters

| 參數名稱 | 解釋 | 型態(或列舉) | 是否需要 | 範例 |
|---|---|---|---|---|
| token | 驗證碼 | String | √ | `09K5QExxt4aDs0hvsiTQX7wG` |
| newPassword | 新密碼 | String | √ | `44444` |
| confirmNewPassword | 確認新密碼 | String | √ | `44444` |

#### Query Parameters

None

#### Response Status Code

200

#### Response Data

```
{
  "_id": "57fe63efdef43b1356c2f1a9",
  "updatedAt": "2016-10-12T16:31:12.633Z",
  "name": "Simon",
  "email": "simon.sun@nownews.com",
  "password": "a2dd55fba88382d6decb24fef85a68aa",
  "__v": 0,
  "createdAt": "2016-10-12T16:25:19.219Z",
  "trashed": false,
  "status": "VERIFIED",
  "gender": "OTHER"
}
```