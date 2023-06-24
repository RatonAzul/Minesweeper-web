export class Timer{
    time: number;
    isTimerRunning: boolean;

    constructor(){
        this.time = 0;
        this.isTimerRunning = false;
    }

    startTimer(){
        this.isTimerRunning = true;
    }

    stopTimer(){
        this.isTimerRunning = false;
    }

}