Web Service Primary Url:
https://zooappwebservice.onrender.com 

Retrieve all zoo information:
https://zooappwebservice.onrender.com/allzooinfo

Add animal:https://zooappwebservice.onrender.com/addanimal

{
"animal_name": "Monkey",
"animal_pic": "https://cdn.pixabay.com/photo/2020/01/23/17/37/monkey-4788331_1280.jpg",
"animal_description": "The monkey is a playful and intelligent primate found in forests and jungles around the world. Known for its agility and social behavior, monkeys live in groups called troops. They use their hands and tails for climbing, foraging for fruits, and communicating with other members of their group."
}

Update animal:https://zooappwebservice.onrender.com/updateanimal

{
"idzoo": 6,
"animal_name": "Giraffe",
"animal_pic": "https://images.pexels.com/photos/1619507/pexels-photo-1619507.jpeg?cs=srgb&dl=animal-animal-photography-giraffe-1619507.jpg&fm=jpg",
"animal_description": "The giraffe is the tallest land animal, known for its long neck and legs. It lives in African savannas and feeds mainly on leaves from tall trees. Giraffes are gentle animals and use their height to spot danger from far away."
}

Delete animal using GET:https://zooappwebservice.onrender.com/deleteanimal/9

Delete animal using POST:https://zooappwebservice.onrender.com/deleteanimal

{
"idzoo": 8
}
