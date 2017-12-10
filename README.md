## Livle Partner

### Project Structure

```
public
  |-- bundle.js
  |-- index.html
src
  |-- assets
    |-- animations
      |-- index.js // root file
      |-- ...ect
    |-- fonts
      |-- ...font_files
    |-- images
      |-- ...image_files
    |-- styles
      |-- index.scss // root file
      |-- ...ect
    |-- strings
      |-- index.js // localization, constants whatever
      |-- ...ect
  |-- components
    |-- connectors // export connected component by react-reducer
      |-- ...custom
    |-- views
      |-- login // show login & signup at the same time => use same URL
        |-- index.js // https://partner.livle.kr/login
      |-- partner
        |-- manage.js // https://partner.livle.kr/partner/manage
        |-- status.js // https://partner.livle.kr/partner/status/${id}
      |-- admin
        |-- member.js // https://partner.livle.kr/admin/member
        |-- manage.js // https://partner.livle.kr/admin/manage
        |-- register.js // https://partner.livle.kr/admin/register
        |-- status.js // https://partner.livle.kr/admin/status/${id}
    |-- partials // reuseable modules (ex. navbar, table, chart)
      |-- ...custom
    |-- app.js // initial settings (ex. define route & import store)
  |-- network
    |-- axios.js // define axios
    |-- index.js // root file
    |-- ...ect
  |-- reducers
    |-- index.js // root file (bind reducers & create store)
    |-- action.js // define reducer actions
    |-- ...ect // custom reducer files
  |-- index.js // export React project to index.html
```

### Reducer Pattern

> store 로 관리해야 할 데이터

```
user_info: {
  token: string,
  username: string
},
ticket_info: {
  /**
  *   '/status/${id}' route 에서 사용될 데이터는 그때그때 통신을 통해 받아옴
  */
  data: array_of.obj // 처음 로그인시 store 에서 저장, 데이터는 항상 store 에서 불러오는 식으로 구현
},
partner_info: {
  /**
  *   이렇게 구현해도, 안해도 됨.
  *   어차피 동일한 데이터이므로 store에 넣으면 통신 횟수를 줄일 수 있지 않을까 하는 생각
  */
  data: array_of.obj // 처음 로그인시 store 에서 저장, 데이터는 항상 store 에서 불러오는 식으로 구현
}
```
