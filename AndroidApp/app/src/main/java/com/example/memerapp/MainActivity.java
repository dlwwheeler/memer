package com.example.memerapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

//this is main activity. what we start off with if we do not want a login right now
public class MainActivity extends AppCompatActivity {


    //stuff that is UI
    private Button btnViewAll;
    private Button btnLike;
    private Button btnDislike;
    private ImageView ivMeme;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //call UI component  by id
        btnViewAll = (Button) findViewById(R.id.btnViewAll);
        btnLike = (Button) findViewById(R.id.btnLike);
        btnDislike = (Button) findViewById(R.id.btnDislike);
        ivMeme = (ImageView) findViewById(R.id.ivMeme);


        //switch t chatboxactivity which views other images
        btnViewAll.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i  = new Intent(MainActivity.this, ChatBoxActivity.class);
                startActivity(i);
            }
        });

        //add a like to the image then set a new image
        btnLike.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        //add a dislike to the image then set a new image
        btnDislike.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
    }
}
