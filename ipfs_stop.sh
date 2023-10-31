#!/bin/bash

var1=$(lsof -i :5001)

echo process info : ${var1}

ipfs_pid=$(echo ${var1} | cut -d " " -f11)

echo pid : ${ipfs_pid} / length : ${#ipfs_pid}

if [ -n "${ipfs_pid}" ]
then
        result1=$(kill -9 ${ipfs_pid})
        echo process is killed.
else
        echo running process not found.
fi
