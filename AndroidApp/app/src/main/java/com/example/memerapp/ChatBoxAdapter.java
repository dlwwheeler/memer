package com.example.memerapp;

import android.graphics.Bitmap;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import java.util.List;


public class ChatBoxAdapter  extends RecyclerView.Adapter<ChatBoxAdapter.MyViewHolder> {
    private List<Message> MessageList;

    public  class MyViewHolder extends RecyclerView.ViewHolder {
        public ImageView ivMyMeme;

        public MyViewHolder(View view) {
            super(view);

            //meme by id
            ivMyMeme = (ImageView) view.findViewById(R.id.ivMyMeme);
        }
    }
    public ChatBoxAdapter(List<Message>MessagesList) {

        this.MessageList = MessagesList;
    }

    @Override
    public int getItemCount() {
        return MessageList.size();
    }
    @Override
    public ChatBoxAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item, parent, false);
        return new ChatBoxAdapter.MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(final ChatBoxAdapter.MyViewHolder holder, final int position) {
        final Message m = MessageList.get(position);
        //set image to image view
        //holder.ivMyMeme.setImageURI();
    }

    private void getMeme(Bitmap finalBitmap) {

    }

}