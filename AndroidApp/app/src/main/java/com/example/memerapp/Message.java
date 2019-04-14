package com.example.memerapp;

import android.graphics.Bitmap;

//This should be what variables are stored in the back end.
public class Message {

    //what should be what stored
    private Bitmap meme;
    private int likes;
    private int dislikes;

    public Message(Bitmap meme, int likes, int dislikes) {
        this.meme = meme;
        this.likes = likes;
        this.dislikes = dislikes;
    }


    public Bitmap getMeme() {
        return meme;
    }

    public void setMeme(Bitmap meme) {
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
