const fs = require('fs');
const filePath = "./tasks.json";

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({ task });
    saveTasks(tasks);
    console.log("Task added", task);
};

const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
};

const removeTask = (taskNumber) => {
    const tasks = loadTasks();
    if(taskNumber <= 0 || taskNumber > tasks.length){
        console.log("Invalid task number!");
        return;
    }
    const removeTask = tasks.splice(taskNumber - 1, 1);
    saveTasks(tasks);
    console.log(`Task removed: ${removeTask[0].task}`);
}

const command = process.argv[2]
const argurment = process.argv[3]

if(command === 'add') {
    addTask(argurment);
} else if(command === 'list'){
    listTasks();
} else if(command === 'remove') {
    removeTask(argurment);
} else{
    console.log("command not found!");
}