package com.ktgame.chatapplication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatRepository repository;

    /**
     * 귓속말 할 때 사용
     */
    @CrossOrigin
    @GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<Chat> getMsg(@PathVariable String sender, @PathVariable String receiver) {
        return repository.mFindBySender(sender, receiver)
                .subscribeOn(Schedulers.boundedElastic());
    }

    /**
     * 일반 챗 모두 조회
     */
    @CrossOrigin
    @GetMapping(value = "/chat/room-number/{roomNum}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<Chat> findByRoomNum(@PathVariable Integer roomNum) {
        return repository.mFindByRoomNum(roomNum)
                .subscribeOn(Schedulers.boundedElastic());
    }

    @CrossOrigin
    @PostMapping("/chat")
    Mono<Chat> setMsg(@RequestBody Chat chat) {
        chat.setCreatedAt(LocalDateTime.now());
        return repository.save(chat);
    }

}
