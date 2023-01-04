package com.ktgame.chatapplication;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {

    @Tailable // DB 커넥션을 닫지 않고 계속 대기 (데이터가 계속 Flux로 흘러들어오는 것을 리스닝)
    @Query("{sender: ?0, receiver: ?1}")
    Flux<Chat> mFindBySender(String sender, String receiver); // Flux(흐름) response를 계속 유지하면서 데이터를 계속 흘려보내기

}
