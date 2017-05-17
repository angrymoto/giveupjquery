import { Observable } from "rxjs";
import * as $ from "jquery";
import * as moment from "moment";
import {List} from "linqts";

export class Comment {
    constructor(id:number,content:string,createAt:Date) {
        this.id = id;
        this.content = content;
        this.createAt = createAt;
    }
    id:number;
    content:string;
    createAt:Date;
}

export class App {

    private comments:List<Comment>;

    public addComment():void {
        
        let creatAt = new Date();
        let momentCreateAt = moment(creatAt).format("YYYY-MM-DDTHH:mm:ss");
        if(!this.comments){
            this.comments = new List<Comment>();
        }
        let lastId = this.comments.Any()?this.comments.Last().id+1:1;
        let comment = new Comment(lastId,"new comment pushed.",creatAt);
        $("#main").append("<div data-id="+lastId+"><span>new comment pushed.</span><span class='time' data-time="+momentCreateAt+" style='color:blue'>刚刚</span></div>")

        this.comments.Add(comment);
    }
}

let app = new App();
$(()=>{
    $("#btn-add").click(app.addComment);
    Observable.interval(1000).subscribe(()=>{
        $(".time").each(function(){
            let createAt = moment($(this).attr("data-time"));
            let time = createAt.fromNow();
            $(this).text(time);
        });
        
    });


    // let canvas = document.querySelector("canvas");
    // let ctx = canvas.getContext('2d');
    // ctx.beginPath();

    // const down$ = Observable.fromEvent(canvas,'mousedown').map(()=>'down');
    // const up$ = Observable.fromEvent(canvas,'mouseup').map(()=>'up');
    // const upAndDown$ = down$.merge(up$);

    // const move$ = Observable.fromEvent<MouseEvent>(canvas,'mousemove')
    // .map(e=>({x:e.offsetX,y:e.offsetY}))
    // .bufferCount(2,1);

    // upAndDown$.switchMap(act=>act === 'down'?move$:Observable.empty())
    // .subscribe(([first,second])=>{
    //     console.log(first.x+":"+first.y);
    //     console.log(second.x+":"+second.y);
    //     ctx.moveTo(first.x,first.y);
    //     ctx.lineTo(second.x,second.y);
    //     ctx.stroke();
    // });
    
    // Observable.fromEvent<MouseEvent>(canvas,'mousedown').subscribe(e=>console.log(e.x+":"+e.y));
    
});

