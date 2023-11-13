# 4주차 크리스마스 프로모션

## 📌 3주차 공통 피드백

<details>
<summary>
자세히보기
</summary>

## 1. 함수(메서드) 라인에 대한 기준

프로그래밍 요구사항을 보면 함수 15라인으로 제한하는 요구사항이 있다. 이때 공백 라인도 한 라인에 해당한다. 15라인이 넘어간다면 함수 분리를 위한 고민을 한다.

## 2. 발생할 수 있는 예외 상황에 대해 고민한다

정상적인 경우를 구현하는 것보다 예외 상황을 모두 고려해 프로그래밍하는 것이 더 어렵다.
예외 상황을 고려해 프로그래밍하는 습관을 들인다.
예를 들어 로또 미션의 경우 아래와 같은 예외 상황을 고민해 보고 해당 예외에 대해 처리를 할 수 있어야 한다.

- 로또 구입 금액에 1000 이하의 숫자를 입력
- 당첨 번호에 중복된 숫자를 입력
- 당첨 번호에 1~45 범위를 벗어나는 숫자를 입력
- 당첨 번호와 중복된 보너스 번호를 입력

## 3. 비즈니스 로직과 UI 로직을 분리한다

비즈니스 로직과 UI 로직을 한 클래스가 담당하지 않도록 한다. 단일 책임의 원칙에도 위배된다.

```javascript
class Lotto {
   #numbers


   // 로또 숫자가 포함되어 있는지 확인하는 비즈니스 로직
   contains(numbers) {
       ...
   }


   // UI 로직
   print() {
       ...
   }


}
```

## 4. 객체의 상태 접근을 제한한다

필드는 private class 필드로 구현한다. 객체의 상태를 외부에서 직접 접근하는 방식을 최소화 하는 이유에 대해서는 스스로 찾아본다.

```javascript
class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
  }
}
```

## 5. 객체는 객체스럽게 사용한다

Lotto 클래스는 numbers를 상태 값으로 가진다. 그런데 이 객체는 로직에 대한 구현은 하나도 없고, numbers에 대한 getter 메서드만을 가진다.

```javascript
class Lotto {
   #numbers


   constructor(numbers) {
       this.#numbers = numbers
   }


   getNumbers() {
       return this.#numbers
   }
}


class LottoGame {
   play() {
       const lotto = new Lotto(...)


       // 숫자가 포함되어 있는지 확인한다.
       lotto.getNumbers().contains(number)


       // 당첨 번호와 몇 개가 일치하는지 확인한다.
       lotto.getNumbers().stream()...
   }
}
```

Lotto에서 데이터를 꺼내지(get) 말고 메시지를 던지도록 구조를 바꿔 데이터를 가지는 객체가 일하도록 한다.

```javascript
class Lotto {
   #numbers


   constructor(numbers) {
       this.#numbers = numbers
   }


   contains(number) {
       // 숫자가 포함되어 있는지 확인한다.
       return ...
   }


   matchCount(other) {
       // 당첨 번호와 몇 개가 일치하는지 확인한다.
       return ...
   }
}


class LottoGame {
   play() {
       const lotto = new Lotto(...)


       lotto.contains(number)
       lotto.matchCount(...)
   }
}
```

(참고. [getter를 사용하는 대신 객체에 메시지를 보내자](https://tecoble.techcourse.co.kr/post/2020-04-28-ask-instead-of-getter/))

## 6. 필드의 수를 줄이기 위해 노력한다

필드의 수가 많은 것은 객체의 복잡도를 높이고, 버그 발생 가능성을 높일 수 있다.
필드에 중복이 있거나, 불필요한 필드가 없는지 확인해 필드의 수를 최소화한다.
예를 들어 총상금 및 수익률을 구하는 다음 객체를 보자.

```javascript
class LottoResult {
  #result = new Map();
  #profitRate;
  #totalPrize;
}
```

위 객체의 **profitRate**와 **totalPrize**는 등수 별 당첨 내역(**result**)만 있어도 모두 구할 수 있는 값이다. 따라서 위 객체는 다음과 같이 하나의 필드만으로 구현할 수 있다.

```javascript
class LottoResult {
   #result = new Map()


   calculateProfitRate() { ... }


   calculateTotalPrize() { ... }
}
```

## 7. 성공하는 케이스 뿐만 아니라 예외에 대한 케이스도 테스트한다

테스트를 작성하면 성공하는 케이스에 대해서만 고민하는 경우가 있다.
하지만 예외에 대한 부분 또한 처리해야 한다.
특히 프로그램에서 결함이 자주 발생하는 부분 중 하나는 경계값이므로 이 부분을 꼼꼼하게 확인해야 한다.

```javascript
test('보너스 번호가 당첨 번호와 중복되는 경우에 대한 예외 처리', () => {
  mockQuestions(['1000', '1,2,3,4,5,6', '6']);
  expect(() => {
    const app = new App();
    app.play();
  }).toThrow('[ERROR]');
});
```

## 8. 테스트 코드도 코드다

테스트 코드도 코드이므로 리팩터링을 통해 개선해 나가야 한다.
특히 반복적으로 하는 부분을 중복되지 않게 만들어야 한다.
예를 들어 단순히 파라미터의 값만 바뀌는 경우라면 아래와 같이 테스트할 수 있다.

```javascript
test.each([['999'], ['0'], ['-123']])('천원 미만의 금액에 대한 예외 처리', (input) => {
  expect(() => {
    const app = new App(input);
    app.play();
  }).toThrow();
});
```

## 9. 테스트를 위한 코드는 구현 코드에서 분리되어야 한다

테스트를 위한 편의 메서드를 구현 코드에 구현하지 마라.
아래의 예시처럼 테스트를 통과하기 위해 구현 코드를 변경하거나 테스트에서만 사용되는 로직을 만들지 않는다.

- 테스트를 위해 **# prefix**를 바꾸는 경우
- 테스트 코드에서만 사용되는 메서드

## 10. 단위 테스트하기 어려운 코드를 단위 테스트하기

아래 코드는 **Random** 때문에 **Lotto**에 대한 단위 테스트를 하기 힘들다.
단위 테스트가 가능하도록 리팩터링한다면 어떻게 하는 것이 좋을까?

```javascript
const MissionUtils = require("@woowacourse/mission-utils");


class Lotto {
   #numbers


   constructor() {
       this.#numbers = Randoms.pickUniqueNumbersInRange(1, 45, 6)
   }
}
---
class LottoMachine {
   execute() {
       const lotto = new Lotto()
   }
}
```

올바른 로또 번호가 생성되는 것을 테스트하기 어렵다.
테스트하기 어려운 것을 클래스 내부가 아닌 외부로 분리하는 시도를 해 본다.

```javascript
const MissionUtils = require('@woowacourse/mission-utils');

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }
}

class LottoMachine {
  execute() {
    const numbers = Randoms.pickUniqueNumbersInRange(1, 45, 6);
    const lotto = new Lotto(numbers);
  }
}
```

위 코드는 A 상황을 B로 바꾼 것이다.

<img width="602" alt="스크린샷 2023-11-10 오전 8 04 54" src="https://github.com/brgndyy/javascript-christmas-6-brgndyy/assets/109535991/c16e33e0-585a-4d9e-9e4f-605b86992c2a">

<img width="604" alt="스크린샷 2023-11-10 오전 8 05 08" src="https://github.com/brgndyy/javascript-christmas-6-brgndyy/assets/109535991/756266d6-5603-4d90-8762-b9fa26dd8cfa">

(참고. [메서드 시그니처를 수정하여 테스트하기 좋은 메서드로 만들기](https://tecoble.techcourse.co.kr/post/2020-05-07-appropriate_method_for_test_by_parameter/))

이처럼 단위 테스트를 할 때 테스트하기 어려운 부분은 분리하고 테스트 가능한 부분을 단위 테스트한다.
테스트하기 어려운 부분은 단위 테스트하지 않아도 된다. 남은 **LottoMachine**은 어떻게 테스트하기 쉽게 바꿀 수 있을지 고민해 본다.

</details>

# 🚀 기능 요구 사항

> 기능 구현 완료시 기능 목록 옆에 '⭕️' 표시가 되어있습니다.

## 1. 첫 시작 안내 문구를 띄운다. ⭕️

- 출력 예시

```
안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.
```

## 2. 사용자에게 식당 예상 방문 날짜를 입력 받는다. ⭕️

- 출력 예시

```
12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)
```

### ❗️예시 총 2개중 1개는 공백이 포함 되어있고, 1개는 공백이 포함이 안되어있어서 맨 앞, 뒤 공백에 대한 부분은 유효성 검증에 포함 시키지 않았습니다.❗️

<img width="426" alt="스크린샷 2023-11-11 오후 12 17 05" src="https://github.com/brgndyy/javascript-christmas-6-brgndyy/assets/109535991/59bb1f5f-6d2e-4edf-9ef7-0985d48f8e1e">

<img width="431" alt="스크린샷 2023-11-11 오후 12 17 26" src="https://github.com/brgndyy/javascript-christmas-6-brgndyy/assets/109535991/4d2430a1-2c14-4b2a-8e34-1c960d6476ba">

### - **❗️예외상황❗️ **

1. 방문할 날짜는 1 이상 31 이하의 숫자여야만한다.
   방문할 날짜가 범위를 벗어났을시 "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요." 라는 에러 메세지를 띄우고 다시 입력을 받는다. ⭕️

2. 방문할 날짜가 숫자가 아닐시에 "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요." 라는 에러 메세지를 띄우고 다시 입력을 받는다. ⭕️

3. 방문할 날짜 입력 값에 중간에 공백을 포함했을시에 "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요." 라는 에러 메세지를 띄우고 다시 입력을 받는다. ⭕️

## 3. 주문 할 메뉴와 갯수를 입력 받는다. ⭕️

- 출력 예시

```
주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)
```

### - **❗️예외상황❗️ **

1. 메뉴판에 없는 메뉴를 고객이 주문했을시에, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

2. 메뉴의 갯수는 총 20개 이하여야한다. 20개를 넘을시에 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

3. 음료만 주문할시에, 주문할수가 없다. 이때 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

4. 메뉴의 갯수는 1이상의 숫자여야한다. 만약 메뉴가 숫자가 아닐시에 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

5. 메뉴의 총 갯수는 20개 이하여야하니, 만약 1개라도 20개를 넘어간다면 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

6. 메뉴와 갯수 입력값 안에 공백이 포함되어있다면 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

7. 메뉴 형식은 무조건 "메뉴-갯수", 그리고 ","로 구분한다. 해당 메뉴의 형식이 아닐시에 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

8. 메뉴 주문은 중복을 포함하면 안된다. 만약 중복을 포함했을 시에 "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 예외가 발생한다. ⭕️

- 입력 예시

```
타파스-1,제로콜라-1       //❗️(,후에 공백포함하면 안됨)❗️
```

### ❗️2번 기능 입력과 마찬가지로 예시 중 총 2개중 1개는 공백이 포함 되어있고, 1개는 공백이 포함이 안되어있어서 맨 앞, 뒤 공백에 대한 부분은 유효성 검증에 포함 시키지 않았습니다.❗

<img width="583" alt="스크린샷 2023-11-12 오후 1 51 21" src="https://github.com/brgndyy/javascript-christmas-6-brgndyy/assets/109535991/7f6419c9-7118-47da-a365-b16179134119">

<img width="578" alt="스크린샷 2023-11-12 오후 1 52 06" src="https://github.com/brgndyy/javascript-christmas-6-brgndyy/assets/109535991/02ed4c68-f53d-4a44-b083-2ea471ee8327">

## 4. 해당 날짜에 해당하는 이벤트 메세지를 출력한다. ⭕️

- 출력 예시

```
12월 N일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!     // (한줄 띄우기)
```

## 5. 주문한 메뉴를 출력한다. ⭕️

⬇️ 출력 예시 ⬇️ (메뉴와 갯수 사이에 공백이 포함되어야한다.)

```
<주문 메뉴>
타파스 1개
제로콜라 1개
```

## 6. 할인 전 총 주문 금액을 출력한다. ⭕️

⬇️ 출력 예시 ⬇️ (금액은 세자리수당 ,로 나누어야한다.)

```
<할인 전 총주문 금액>
8,500원
```

## 7. 증정 메뉴를 출력한다. ⭕️

- 할인 전 총 주문 금액이 12만원 이상이라면, 샴페인을 1개 증정하고, 그것이 아니라면 '없음'으로 출력한다.

⬇️ 출력 예시 ⬇️ (증정 이벤트 조건에 부합하지 못한 경우)

```
<증정 메뉴>
없음
```

⬇️ 출력 예시 ⬇️ (증정 이벤트 조건에 부합한 경우)

```
<증정 메뉴>
샴페인 1개
```

## 8. 혜택 내역을 출력한다.

- 해당 고객에 적용된 이벤트 내역만 보여주어야한다. ⭕️
- 적용된 이벤트가 하나도 없다면 "없음"으로 출력한다. ⭕️
- 혜택 내역에 여러개의 이벤트가 적용 된 경우, 출력 순서는 자유롭게 출력한다. ⭕️
- 증정메뉴 샴페인이 포함된경우 증정 이벤트 : -25,000원 을 포함해야한다. ⭕️

⬇️ 출력 예시 ⬇️ (혜택 내역이 없는 경우)

```
<혜택 내역>
없음
```

⬇️ 출력 예시 ⬇️ (혜택 내역이 있는 경우, 금액은 세자리수당 ,로 나누어야하며, 금액 앞에 "-"이 붙어야한다. ":" 뒤에는 공백이 한번 포함되어야한다.)

```
<혜택 내역>
크리스마스 디데이 할인: -1,200원
평일 할인: -4,046원
특별 할인: -1,000원
증정 이벤트: -25,000원
```

### - **❗️주의 상황❗️ **

**혜택은 총 주문 금액 1만원 이상부터 적용 된다. 그 이하 금액이라면 아무런 혜택 적용도 받을 수 없다.** ⭕️

## 9. 혜택 금액을 출력한다.

1. 혜택 금액이 없는 경우에 0원으로 출력한다. ⭕️
2. 혜택 금액이 있는 경우 ","로 금액을 나누고 앞에 "-"를 포함한다. ⭕️
3. 만약 증정 이벤트가 포함 된경우, 이때 금액은 포함해서 출력해야한다. ⭕️
4. 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격의 합이다. ⭕️

⬇️ 출력 예시 ⬇️ (혜택 금액이 없는 경우)

```
<총혜택 금액>
0원
```

⬇️ 출력 예시 ⬇️ (혜택 금액이 있는 경우)

```
<총혜택 금액>
-31,246원
```

## 10. 할인 후 예상 결제 금액을 출력한다.

1. 만약 증정 이벤트 (샴페인 증정)이 포함되었다면, 해당 25,000원 은 제외해야한다. ⭕️
2. 만약 할인 적용되는 부분이 없었다면 할인 전 총 주문 금액과 동일하게 출력한다. ⭕️
3. ","를 기준으로 나누어서 출력한다. ⭕️
4. 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액 이다. ⭕️

⬇️ 출력 예시 ⬇️ (할인 이벤트 적용 안 된 경우)

```
<할인 후 예상 결제 금액>
8,500원
```

⬇️ 출력 예시 ⬇️ (할인 이벤트 적용 안 된 경우)

```
<할인 후 예상 결제 금액>
135,754원
```

## 11. 이벤트 배지를 출력한다.

1. 총 혜택 금액에 따른 이벤트 배지를 출력해야한다.
   총 혜택 금액이 5천원 이상인 경우 "별", 1만원 이상인 경우 "트리", 2만원 이상인 경우 "산타"를 출력한다. ⭕️
2. 이벤트 배지가 없는 경우 "없음"으로 출력한다. ⭕️

⬇️ 출력 예시 ⬇️ (이벤트 배지가 없는 경우)

```
<12월 이벤트 배지>
없음
```

⬇️ 출력 예시 ⬇️ (이벤트 배지가 있는 경우)

```
<12월 이벤트 배지>
산타
```

### - ** ❗️ 그 외 예외사항 ❗️ **

1. 모든 예외 처리시 "[ERROR]" 문자열로 시작해야하며, 예외 처리 후에 그 부분부터 다시 입력을 받는다. ⭕️

1. 12월 1일부터 25일까지만 크리스마스 디데이 할인이 포함 되고, 그 외에 날짜에는 평일 할인, 주말 할인, 특별 할인, 증정 이벤트를 적용한다. ⭕️

---

## - 🔍 각 이벤트 내용

### 1. 크리스마스 디데이 이벤트 (12월1일 ~ 12월 25일까지만 적용)

- 이벤트 기간: 2023.12.1 ~ 2023.12.25
  1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가
  총주문 금액에서 해당 금액만큼 할인
  (e.g. 시작일인 12월 1일에 1,000원, 2일에 1,100원, ..., 25일엔 3,400원 할인)

### 2. 평일 할인 (12월 1일 ~ 12월 31일까지 적용)

- 일요일부터 목요일 안에 포함 되는 날이라면, **디저트메뉴**를 1개당 2,023원씩 할인 해준다.

### 3. 주말 할인 (12월 1일 ~ 12월 31일까지 적용)

- 금요일과 토요일날 주문을 하는것이라면, **메인 메뉴**를 메뉴 1개당 2,023원 할인 해준다.

### 4. 특별 할인 (12월 3일, 10일, 17일, 24일, 25일, 31일, 매주 일요일, 그리고 25일인 월요일만 적용)

- 총 주문 금액에서 1,000원 할인

### 5. 증정 이벤트 (12월 1일 ~ 12월 31일까지 적용)

- 할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정 (하나당 가격은 25,000원)

## - 🔍 메뉴판

```
<애피타이저>
양송이수프(6,000), 타파스(5,500), 시저샐러드(8,000)
<메인>
티본스테이크(55,000), 바비큐립(54,000), 해산물파스타(35,000), 크리스마스파스타(25,000)
<디저트>
초코케이크(15,000), 아이스크림(5,000)
<음료>
제로콜라(3,000), 레드와인(60,000), 샴페인(25,000)
```

# 🎯 프로그래밍 요구 사항

- <details>
    <summary> .nvmrc 에 노드 버전 기재</summary>

  `v.18.17.1`
  </details>

- <details>
    <summary>eslint 룰 적용</summary>

  `npm install --save-dev eslint eslint-plugin-jsdoc@latest eslint-plugin-jest@latest eslint-plugin-prettier@latest eslint-config-prettier @babel/eslint-parser` 로 설치하고 .eslintrc.cjs 파일을 만들어서 룰 적용
  </details>

- <details>
    <summary> indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용한다</summary>

  eslint 에 `max-depth': ['error', 2]` 룰 추가
  </details>

- <details>
  <summary>JavaScript 코드 컨벤션을 지키면서 프로그래밍 한다</summary>

  `npm install --save-dev eslint-config-airbnb` 설치 후 .eslintrc.cjs 에서 `extends : ['airbnb']` 추가

- <details>
    <summary> 함수(또는 메서드)의 길이가 15라인을 넘어가지 않도록 구현한다.</summary>

  eslintrc.cjs에 `'max-lines-per-function': ['error', 15],` 룰 추가
  </details>

- <details>
    <summary> 사용자가 잘못된 값을 입력할 경우 throw문을 사용해 예외를 발생시킨다. 그런 다음, "[ERROR]"로 시작하는 에러 메시지를 출력하고 해당 부분부터 입력을 다시 받는다. </summary>

  `asyncFnHandlerWithError` 라는 유틸 함수 생성 후 각 입력 받는 함수마다 실행
  </details>

## 추가된 요구 사항

1. `InputView`, `OutputView` 객체를 활용해 구현한다.
2. **입력과 출력을 담당하는 객체를 별도로 구현**한다.
3. `InputView`, `OutputView`의 파일 경로는 변경할 수 있다.
4. `InputView`, `OutputView`의 메서드의 이름과 인자는 필요에 따라 **추가하거나 변경할 수 있다**.
5. 값 출력을 위해 필요한 메서드를 **추가할 수 있다**.

# ✏️ 과제 진행 요구 사항

- <details>
    <summary>기능을 구현하기 전 docs/README.md에 구현할 기능 목록을 정리해 추가한다.</summary>

  README.md 파일 작성 중
  </details>

# - 📂 폴더 구조

<details>
<summary>자세히 보기</summary>

```
📦src
 ┣ 📂constants
 ┃ ┣ 📂delimiters
 ┃ ┃ ┗ 📜delimiter.js  // 구분 기호를 담은 상수 파일
 ┃ ┣ 📂messages
 ┃ ┃ ┣ 📜bannerMessages.js  // 배너 메세지들을 담은 상수 파일
 ┃ ┃ ┣ 📜errorMessages.js  // 에러 메세지를 담은 상수 파일
 ┃ ┃ ┣ 📜orderMessages.js  // 주문 관련 메세지들을 담은 상수 파일
 ┃ ┃ ┗ 📜resultMessages.js // 결과 출력 메세지들을 담은 상수 파일
 ┣ 📂database
 ┃ ┣ 📂configData
 ┃ ┃ ┣ 📜dateConfigData.js // 날짜 관련 시스템 객체
 ┃ ┃ ┣ 📜eventBageConfigData.js // 이벤트 뱃지 데이터 객체
 ┃ ┃ ┣ 📜eventConfigData.js // 이벤트 관련 데이터 객체
 ┃ ┃ ┣ 📜freeGiftConfigData.js // 증정 선물 관련 데이터 객체
 ┃ ┃ ┗ 📜orderConfigData.js // 주문 관련 데이터 객체
 ┃ ┣ 📂menus
 ┃ ┃ ┣ 📜allMenu.js // 모든 메뉴 데이터 객체
 ┣ 📂domains
 ┃ ┣ 📜DiscountMachine.js // 할인 적용을 도와주는 클래스
 ┃ ┣ 📜EventCalendar.js // 방문 날짜에 해당하는 정보들을 담고 있는 클래스
 ┃ ┗ 📜Order.js // 주문을 담당하는 클래스
 ┣ 📂errors
 ┃ ┣ 📜DateError.js // 날짜 입력 예외 처리 관련 커스텀 클래스
 ┃ ┗ 📜OrderError.js // 주문 입력 예외 처리 관련 커스텀 클래스
 ┣ 📂helper
 ┃ ┗ 📜DiscountMachineHelper.js // 할인 내역 관련 값을 계산해주는 헬퍼 클래스
 ┣ 📂service
 ┃ ┣ 📜EligibilityChecker.js // 이벤트 뱃지 및 증정 선물 자격 유무를 판단해주는 서비스 클래스
 ┃ ┗ 📜OrderService.js // 주문 내역을 객체화해주도록 도와주는 클래스
 ┣ 📂utils
 ┃ ┣ 📜asyncFnHandlerWithError.js // 비동기 제어 유틸 함수
 ┃ ┣ 📜deepFreeze.js // 객체를 깊은 동결 해주는 유틸 함수
 ┃ ┣ 📜findObjFromProperty.js // 객체 배열 에서 해당 프로퍼티에 맞는 단일 객체 반환 함수
 ┃ ┗ 📜formatPrice.js // 출력 형식에 맞도록 숫자를 변환 해주는 유틸 함수
 ┣ 📂validator
 ┃ ┣ 📜OrderFormatValidator.js // 주문 내역 입력에 관하여 유효성 검증하는 클래스
 ┃ ┣ 📜OrderRulesValidator.js // 주문 규칙 관련하여 유효성 검증하는 클래스
 ┃ ┗ 📜OrderValidator.js // 위의 두개를 합쳐주는 클래스
 ┣ 📂views
 ┃ ┣ 📜InputView.js // 입력 객체
 ┃ ┗ 📜OutputView.js // 출력 객체
 ┣ 📜App.js // 총체적인 어플리케이션의 진행을 담당하는 메인 클래스
 ┗ 📜index.js // 어플리케이션 진입점이 되는 부분
```

</details>

# 🔍 테스트 커버리지

jest의 커버리지 기능으로 테스트 실행 결과를 확인합니다.

```
npx jest --coverage
```

<details>
<summary>테스트 결과 보기</summary>

```
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |     100 |      100 |     100 |     100 |
 src                         |     100 |      100 |     100 |     100 |
  App.js                     |     100 |      100 |     100 |     100 |
 src/constants/delimiters    |     100 |      100 |     100 |     100 |
  delimiter.js               |     100 |      100 |     100 |     100 |
 src/constants/messages      |     100 |      100 |     100 |     100 |
  bannerMessages.js          |     100 |      100 |     100 |     100 |
  errorMessages.js           |     100 |      100 |     100 |     100 |
  orderMessages.js           |     100 |      100 |     100 |     100 |
  resultMessages.js          |     100 |      100 |     100 |     100 |
 src/database/configData     |     100 |      100 |     100 |     100 |
  dateConfigData.js          |     100 |      100 |     100 |     100 |
  eventBageConfigData.js     |     100 |      100 |     100 |     100 |
  eventConfigData.js         |     100 |      100 |     100 |     100 |
  freeGiftConfigData.js      |     100 |      100 |     100 |     100 |
  orderConfigData.js         |     100 |      100 |     100 |     100 |
 src/database/menus          |     100 |      100 |     100 |     100 |
  allMenu.js                 |     100 |      100 |     100 |     100 |
 src/domains                 |     100 |      100 |     100 |     100 |
  DiscountMachine.js         |     100 |      100 |     100 |     100 |
  EventCalendar.js           |     100 |      100 |     100 |     100 |
  Order.js                   |     100 |      100 |     100 |     100 |
 src/errors                  |     100 |      100 |     100 |     100 |
  DateError.js               |     100 |      100 |     100 |     100 |
  OrderError.js              |     100 |      100 |     100 |     100 |
 src/helper                  |     100 |      100 |     100 |     100 |
  DiscountMachineHelper.js   |     100 |      100 |     100 |     100 |
 src/service                 |     100 |      100 |     100 |     100 |
  EligibilityChecker.js      |     100 |      100 |     100 |     100 |
  OrderService.js            |     100 |      100 |     100 |     100 |
 src/utils                   |     100 |      100 |     100 |     100 |
  asyncFnHandlerWithError.js |     100 |      100 |     100 |     100 |
  deepFreeze.js              |     100 |      100 |     100 |     100 |
  findObjFromProperty.js     |     100 |      100 |     100 |     100 |
  formatPrice.js             |     100 |      100 |     100 |     100 |
 src/validator               |     100 |      100 |     100 |     100 |
  OrderFormatValidator.js    |     100 |      100 |     100 |     100 |
  OrderRulesValidator.js     |     100 |      100 |     100 |     100 |
  OrderValidator.js          |     100 |      100 |     100 |     100 |
 src/views                   |     100 |      100 |     100 |     100 |
  InputView.js               |     100 |      100 |     100 |     100 |
  OutputView.js              |     100 |      100 |     100 |     100 |
-----------------------------|---------|----------|---------|---------|-------------------


```

</details>
