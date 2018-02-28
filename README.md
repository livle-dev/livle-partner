## Livle Partner

### 데모영상
https://www.youtube.com/watch?v=dPbW06nZhTs

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
