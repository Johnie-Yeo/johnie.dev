---
title: Transaction Isolation Level
date: "2020-05-11T15:12:03.284Z"
description: "RDBMS의 Transaction Isolation level"
thumbnail: "./dirty-read.jpg"
tags: ["Database", "transaction"]
---

# Transaction Isolation Level이란?

<br>

데이터베이스가 정합성을 유지하기 위해서는 ACID 속성을 따라야 합니다. 이 네가지 속성(Atomicity, Consistency, Isolation, Durability) 중 Isolation은 트랜잭션의 무결성이 다른 사용자나 시스템에 보여지는 방법을 결정합니다. 이것은 트랜잭션이 시스템에서 발생해서, 데이터베이스 시스템의 해당 자원에 접근하는 유일한 트랜잭션이어야 한다는 것을 말합니다. 

Isolation level은 데이터베이스 시스템의 데이터를 수정하는 한 트랜잭션이 다른 트랜잭션으로부터 얼마나 고립되어 있는가에 대한 정도를 의미합니다. 조금 더 쉽게 말해보면 A라는 트랜잭션이 어떤 테이블의 데이터를 수정했을 때 다른 트랜잭션이 이를 어떻게 받아들이나에 관한 이야기 입니다. 이 이야기는 동시에 Isolation이 제대로 지켜지지 않을 수 도 있다는 이야기 입니다. 완벽한 Isolation의 보장은 동시성의 문제로 DB 성능 자체에 큰 영향이 가기 때문입니다. 

Transaction isolation level은 이와 같이 완벽한 ACID는 보장이 되지 않더라도 어느정도 타협하며 DB성능을 최대로 끌어냄과 동시에 데이터의 정합성을 보장하기 위해 있는 여러 level입니다.

<br>

> #### 트랜잭션의 ACID 속성
>
> 1. Atomicity
>    - 트랜잭션의 작업이 부분적으로 실행되거나 중단되지 않는 것을 보장
>    - All or Noting의 개념으로서 작업 단위를 일부분만 실행하지 않음
> 2. Consistency
>    - 트랜잭션이 성공적으로 완료되면 일관적인 DB상태(데이터의 타입, 값 등)를 유지
> 3. Isolation
>    - 트랜잭션 수행시 다른 트랜잭션의 작업이 끼어들지 못하도록 보장
>    - 즉, 트랜잭션끼리는 서로를 간섭할 수 없다.
> 4. Durability
>    - 트랜잭션이 성공적으로 수행이 되면, 즉 commit되면 현재 상태가 영원히 반영

<br>

## 낮은 Transaction Isolation Level로 인해 발생하는 문제점

---

<br>

### 1. Dirty Read

커밋되지 않은 수정 중인 데이터를 다른 트랜잭션에서 읽을 수 있는 경우를 말합니다. dirty read의 문제는 만약 데이터를 수정한 트랜잭션이 rollback이 됐을 때, 수정했던 데이터를 읽은 트랜잭션은 잘못된 데이터(dirty data)를 가지게 되는 것입니다.

<br>

### 2. Non-Repeatable Read

한 트랜잭션 내에서 같은 데이터를 두번 이상 조회할 때 그 사이 다른 트랜잭션으로 인해 값이 수정 혹은 삭제되어 동일한 두 쿼리에 대해 다른 결과가 나오는 현상을 말합니다. 즉 트랜잭션의 consistency가 깨지기 때문에 문제가 발생하는 것입니다.

<br>

### 3. Phantom read

한 트랜잭션 내에서 일정 범위의 데이터를 두번 이상 조회할 때, 처음에는 없었던 데이터가 나타나는 현상을 말합니다. 이는 트랜잭션 도중 새로운 레코드 삽입을 허용하기 때문에 발생합니다. phantom read를 방지하기 위해서는 write lock이 필요해 집니다. 하지만 MySQL에서는 이를 다른 방식으로 해결하였습니다. 이에 관한 자세한 이야기는 아래 isolation levels에 대해 설명하며 다루겠습니다.

<br>

## Transaction Isolation Level의 4단계

---

<br>

### 1. READ UNCOMMITTED

커밋되지 않은 단순히 최신 업데이트된 데이터를 읽는 것입니다.

각 트랜잭션에서 변경 내용이 COMMIT 혹은 ROLLBACK 됨에 상관없이 다른 트랜잭션에서 변경된 값을 즉시 읽을 수 있습니다. Consistency에 문제가 많은 상당히 위험한 격리수준으로 사용하지 않는 것이 권장됩니다. Read uncommitted에서는 dirty read, non-repeatable read, phantom read 모두 발생 가능합니다.

<br>

### 2. READ COMMITTED

커밋된 데이터만 읽는 것을 말합니다.

Dirty read와 같은 현상은 발생하지 않습니다. 실제 테이블 값을 가져오는 것이 아닌 undo 영역에 백업된 레코드에서 값을 가져오는 방식입니다. 같은 트랜잭션 내부에서는 최근의 스냅샷을 읽는 기법이 적용됩니다.

Read committed에서는 non-repeatable read 및 phantom read가 발생할 수 있습니다. 여기서의 문제는 주로 입출금과 같은 금전적인 프로세스에서 주로 발생합니다. 잔액이 100만원이었는데 출금 버튼 누르기 전에 다른 사람이 돈을 인출한 상황... 많이 봤죠? 이렇게 데이터의 consistency는 깨지고 버그는 찾기 힘들어지는 것이 read committed의 문제점입니다.

<br>

### 3. REPEATABLE READ

> 대부분의 RDBMS의 디폴트 isolation level

한 트랜잭션이 접근했던 데이터에 대해 해당 트랜잭션이 완료될 때까지는 다른 사용자(트랜잭션)는 해당되는 데이터에 대한 수정이 불가능합니다. 

예를 들어 `SELECT col FROM a WHERE {condition}` 을 수행했고 그 결과가 `col = 1, 5` 인 경우 다른 사용자(트랜잭션)는 col이 1 혹은 5인 row에 대해 수정 및 삭제가 불가능합니다. 하지만 condition에 해당하는 row를 삽입하는 것은 가능합니다. 따라서 동일한 쿼리에 대해 추가적인 데이터가 읽어지는, 즉 phantom read가 발생할 수 있습니다.

하지만 MySQL에서는 repeatable read에 대한 접근 방법이 다릅니다. MySQL에서는 repeatable read만으로 non-repeatable read 및 phantom read 모두 발생하지 않습니다. MySQL에서는 트랜잭션의 첫번째 read에서 스냅샷을 생성합니다. 이후 동일한 쿼리에 대해서는 생성한 스냅샷에서부터 값을 읽습니다. 따라서 phantom read가 발생하지 않게 되는 것입니다. 

<br>

### 4. SERIALIZABLE

가장 단순한 격리수준이며 가장 엄격한 격리 수준입니다.

완벽한 읽기 일관성 모드가 제공됩니다. MySQL에서는 모든 SELECT 문에 shared lock(read lock)이 걸립니다.

하지만 매우 엄격한 탓에 성능 측면에서 동시 처리성능이 가장 떨어지는 단점을 갖습니다. 따라서 대부분의 데이터베이스에서 거의 사용되지 않습니다.

<br>

<br>

> #### Reference
>
> - [GeeksforGeeks - Transaction Isolation Levels in DBMS](https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/)
> - [[DB이론] 트랜잭션(transaction)과 ACID 특성을 보장하는 방법](https://victorydntmd.tistory.com/129)
> - [Isolation level (정리)](http://egloos.zum.com/ljlave/v/1530887)
> - [데이터베이스 Isolation Level](https://effectivesquid.tistory.com/entry/데이터베이스-Isolation-Level)
> - [트랜잭션의 격리 수준(isolation Level)이란?](https://nesoy.github.io/articles/2019-05/Database-Transaction-isolation)
> - [Lock으로 이해하는 Transaction의 Isolation Level](https://suhwan.dev/2019/06/09/transaction-isolation-level-and-lock/)

