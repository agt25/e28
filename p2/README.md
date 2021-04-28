## Project 2
By: Angela T 
Production URL: [Pandemic Cafe](http://e28p2.vue28.me)

## Pages summary
1. Lounge aka 'ListenPage.vue'
2. Liked aka 'LikedPage.vue'
3. Explore aka 'ExplorePage.vue'

## SFC summary
1. CoffeePod.vue; presents a neumorphic-like "iPod" player which plays the current track.
2. LikedTrackDisplay.vue; presents a liked track object via its album cover, track name, and track artist(s).
3. AboutSection.vue; pops a up a brief "about this app" section. 

## Server interaction
1. Get request to get all the tracks from the API
2. Put request to update a given track's 'liked' property; this depends on whether the user is liking or unliking a track. 


## Outside resources

### Lounge Page

1. The text part of the logo that says ‘Cafe’ is from [404 Neon Text by Bluehaus](https://codepen.io/Bluehaus/pen/bZkZom)

2. The range sliders were modified from [Ana Tudor's CodePen](https://codepen.io/thebabydino/pen/pvLPOQ)

3. Slight self-pat for my cafe's nav*bar*. I wish I had an island like it. I made it by taking a picture of a bed headboard from Restoration Hardware’s site (free HD!) and adding a marble slab atop. If anyone ever runs out of realistic free image sources, check out furniture sites! I can't believe I hadn't thought of it 'till now!


### Likes Page

1. The header that says ‘likes’ is from Matthew Wilber’s CodePen [‘Vintage Button’](https://codepen.io/mwilber/pen/jvZMVb)

2. The header which says music is the same text as on the lounge page —— [404 Neon Text by Bluehaus](https://codepen.io/Bluehaus/pen/bZkZom)


PS, tracks and sound-effects are hosted on Amazon S3 buckets. 


### Notes for instructor
About a week ago, I tried to build somewhat of an educational TikTok clone. I thought I’d be able to — despite having another project, a 7-page paper, and a database pset due within that week. Needless to say, I did not succeed at getting the backend running with Firebase. I also briefly tried Django but had overestimated my knowledge within — thinking I’d be able to learn REST in a day. So thank you for building an API for us (that I should’ve used from the get-go!). It’s amazing! You make it look so easy!

And most importantly, thank you so much for your extension policy. I had a ton of anxiety taking my first! But it allowed me to mess up, experiment, and learn all the better without the fear of a pending deadline. I think your policy is wonderful. I can only wish that other professors implement something like it! So, I bow down to you! Thank you for thinking ahead for your students and making everything a little better for me at a week when I was ready to drop out from the stress and deadlines! I'm also truly sorry for taking the full week. I had a lot of fun with this project and kept adding  to it :) 

-----

PS, there's an itsy bitsy teeny weeny bug...wearing a yellow polka dot bikini. It might be irrelevant to the requirements of server interaction / SFCs. But I thought I'd let you know! The bug occurs after you've played all the tracks and you default back to track #1; the play() button is interrupted by a new load request. I meant to make it an async function but somewhere along the way I lost my mind and skipped it on my TODO list. I've also just noticed (but fixed on the AWS side) that half the tracks defaulted to private. I recall setting them all open to the public. It's all fixed now. But in the event that the tracks "play hard-to-get", please let me know so I can go get them :) 
