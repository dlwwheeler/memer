package com.example.memerapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;

public class ChatBoxActivity extends AppCompatActivity {

    //declare socket object

    private Socket socket;
    private String Nickname ;

    @Override
    protected
    void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_box);

// get the nickame of the user



        Nickname = (String)getIntent().getExtras().getString(MainActivity.NICKNAME);

//connect you socket client to the server

        try {


//if you are using a phone device you should connect to same local network as your laptop and
// disable your pubic firewall as well

            socket = IO.socket("http://localhost:3000/");

            //create connection

            socket.connect();

// emit the event join along side with the nickname

            socket.emit("join",Nickname);


        } catch (URISyntaxException e) {
            e.printStackTrace();

        }

    }
}