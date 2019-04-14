package com.example.memerapp;

import android.media.Image;

//This should be what variables are stored in the back end.
public class Message {

    private String nickname;
    private String message ;
    //what should be what stores
    private Image meme;
    private int likes;
    private int dislikes;

    public Message(String nickname, String message) {
        this.nickname = nickname;
        this.message = message;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Image getMeme() {
        return meme;
    }

    public void setMeme(Image meme) {
        this.meme = meme;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }
}
