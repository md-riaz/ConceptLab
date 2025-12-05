export const osPseudocode = {
  'round-robin': `function roundRobinScheduling(processes, timeQuantum):
    readyQueue = []
    currentTime = 0
    
    while there are unfinished processes:
        # Add arrived processes to queue
        for each process in processes:
            if process.arrivalTime <= currentTime and not in queue:
                readyQueue.enqueue(process)
        
        if readyQueue is empty:
            # CPU idle, advance to next arrival
            currentTime = next_arrival_time
            continue
        
        # Get process from front of queue
        process = readyQueue.dequeue()
        
        # Execute for time quantum or remaining time
        executionTime = min(timeQuantum, process.remainingTime)
        execute(process, executionTime)
        currentTime += executionTime
        process.remainingTime -= executionTime
        
        # Check if process completed
        if process.remainingTime == 0:
            mark_as_completed(process)
        else:
            # Preempt and re-add to end of queue
            readyQueue.enqueue(process)
    
    return ganttChart`,

  'sjf': `function sjfScheduling(processes):
    readyQueue = []
    currentTime = 0
    completed = []
    
    while completed.length < processes.length:
        # Add all arrived processes to ready queue
        for each process in processes:
            if process.arrivalTime <= currentTime and not completed:
                add process to readyQueue
        
        if readyQueue is empty:
            # CPU idle, advance to next arrival
            currentTime = next_arrival_time
            continue
        
        # Select process with shortest burst time
        shortestJob = null
        for each process in readyQueue:
            if shortestJob == null or process.burstTime < shortestJob.burstTime:
                shortestJob = process
        
        # Execute selected process to completion
        execute(shortestJob, shortestJob.burstTime)
        currentTime += shortestJob.burstTime
        completed.add(shortestJob)
        readyQueue.remove(shortestJob)
    
    return ganttChart`
};
