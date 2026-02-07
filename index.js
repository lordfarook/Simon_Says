const list_Progress_Colors = []
const list_Progress_Clicks = []
const colors = ["green", "red", "yellow", "blue"]


function Pressed(id){
    $("#"+id).addClass("pressed")
    setTimeout(e => {
        $("#"+id).removeClass("pressed")
    }, 100)
}

function Key_Sound(){
    sound = new Audio("./sounds/click_sound.wav")
    sound.play()
}

function GameOver_Sound(){
    sound = new Audio("./sounds/game_over_sound.mp3")
    sound.play()
}

function Winning_Sound(){
    sound = new Audio("./sounds/winning_sound.wav")
    sound.play()
}

function Random_Animation_Sound(color){
    $("#"+color).fadeOut()
    setTimeout(e => {
        $("#"+color).fadeIn()
    }, 100)
    sound = new Audio("./sounds/Random_color_sound.wav")
    sound.play()
}


$(".start-button").click(e=>{
    Random_Color()
    $(e.target).fadeTo(300, 0)
    $(e.target).css("pointer-events", "none")
    $("h1").text("Level 1")
})

$(".box").click(function(e){
    Pressed(e.target.id)
    Key_Sound()
    list_Progress_Clicks.push(e.target.id)
    Check()
    console.log(list_Progress_Clicks)
})


function Random_Color(){
    var random_number = Math.floor(Math.random()*colors.length)
    var rand_color = colors[random_number]
    Random_Animation_Sound(rand_color)
    list_Progress_Colors.push(rand_color)
    console.log(list_Progress_Colors)
    console.log("Random_Color is runnning")
}

function Check(){
    for (let i=0; i<list_Progress_Clicks.length; i+=1){
        if (list_Progress_Clicks[i] !== list_Progress_Colors[i]){
            list_Progress_Clicks.length = 0
            list_Progress_Colors.length = 0
            $("h1").text("Loser")
            $(".start-button").text("Try again")
            $(".start-button").fadeTo(300, 1)
            $(".start-button").css("pointer-events", "auto")
            GameOver_Sound()
            return
        }
    }
    if (list_Progress_Clicks.length === list_Progress_Colors.length){
        Next_Level()
        Winning_Sound()
    }
}
    



function Next_Level(){
    Random_Color()
    $("h1").text("Level "+list_Progress_Colors.length)
    list_Progress_Clicks.length = 0
}


