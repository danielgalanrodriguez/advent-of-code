#!/bin/bash

DAY=$1

if [ $# -lt 1 ]
then
    echo "You need to enter the day number"  
    exit 1 
fi

# Create folder
mkdir $DAY

# create files
touch ./$DAY/puzzle.txt
touch ./$DAY/example_data.txt
touch ./$DAY/problem_1.txt
touch ./$DAY/problem_2.txt
touch ./$DAY/solution_1.js
touch ./$DAY/solution_2.js