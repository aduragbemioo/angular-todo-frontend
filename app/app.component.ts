import {Component, OnInit} from "@angular/core";
import {TaskService} from "./task.service";
import {Task} from "./task";


@Component ({

  selector: "my-app",
  templateUrl: "app/app.component.html",
  providers:[TaskService]
})

export class AppComponent implements OnInit{
  constructor(private taskService:TaskService){}
  lists: Task[];
ngOnInit (){
  
        this.taskService.getTasks()
          .subscribe(data =>{
            console.log(data.json());
            this.lists = data.json().map(function(elem){
              elem.showBox = false;
              elem.id = elem._id;
              return elem;
            });
            console.log('Frontend', this.lists);
          })
      }
      
  addTask(task: string){
    const newTask : Task = new Task(task);
    console.log(newTask);
    if(task){
      this.lists.push(newTask);
      this.taskService.postTask(newTask)
            .subscribe(data =>{
              console.log('Added',data.json().title);
            });
    }
    console.log(this.lists);
  }

  deleteTask(index:number){
    this.taskService.deleteTask(this.lists[index].id).subscribe((res) => {});
    this.lists.splice(index,1);
  }

  listEmpty(){
    return !this.lists.length;
  }

  showEditbox(index:number){
      if(this.lists[index].showBox){
        this.lists[index].showBox = false;
      }else{
        this.lists[index].showBox= true;
      }
    return this.lists[index].showBox;

  }

  getOne(index:number){
    this.taskService.getOne(this.lists[index].id)
          .subscribe(data =>{
            console.log('getOne returns ', data.json());
          })
  }

  updateTask (task, index){
      console.log(task.title,this.lists[index].title);
      if(task){
        this.lists[index].title = task.title;
        this.taskService.updateTask(this.lists[index].id, task).subscribe((res) => {});
      }
    }
      
  }
