#!/bin/bash

var1=$(lsof -i :3001)

#echo process info : ${var1}

react_pid=$(echo ${var1} | cut -d " " -f11)

echo pid : ${react_pid} / length : ${#react_pid}

if [ -n "${react_pid}" ]
then
        result1=$(kill -9 ${react_pid})
        echo process is killed.
else
        echo running process not found.
fi

