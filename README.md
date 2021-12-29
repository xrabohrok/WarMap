# The War For Rayuba War Archive

[THE BLOOD OF WAR STAINS HISTORY, EVEN TODAY](https://xrabohrok.github.io/WarMap)

## What is this?

In January 2021, Tom Parkinson-Morgan/Abaddon of Kill Six Billion Demons (KSBD) fame announced he would run a second Original Character Tournament, [The War For Rayuba](https://killsixbilliondemons.com/war-for-rayuba-is-now-live/) along with some people he knows.  Instead of being a tournament bracket format, this OCT would instead have a wargame setup with a map and environments that must be accounted for.  However, the additonal complexity of this setup makes following along somewhat difficult.  

This project had three goals:

1. Make painfully obvious what happened, when, where, with who  
1. Track what you have read and what you still need to
1. Archive in a usable and stable way the works that are generated from this OCT
    1. b. Encourage participants to put their comics in longer lasting locations

Discord keeps links to uploaded pictures as long as they aren't "orphaned" (i.e. are still linked to from somewhere).  A lot of the previous OCT (Ring of Power) has been functionally lost due to channel cleanup and discord server channel count limits.  Providing incentives for people to upload their work to more stable hosting is a small step to avoiding this fate again.  

This record is a visualization of the [Archive Google Sheet (view-only mirror)](https://docs.google.com/spreadsheets/d/15d804_im5dHn1p22rEqSuRo29ezqsrGBkHyKALF9gDo/edit#gid=1678530749) , which I also help maintain.  Data for here comes directly from there, and is the more "canonical" source short of the discord itself. 

## What this is NOT

**This is not really the intended way to experience this OCT**. Think of this more like an interactive history book tool. The way it was experienced was the discord channel, and a lot of context lives there.

**This is not a replacement for the experience of being in the OCT or the Discord** What's up with Peepys?  Why do we all love MOd?  Did someone say "Magical Girl AU?  You had to have been there.

**This is not a host for the comics themselves** Lets face it, the internet rots faster than a happy-meal burger.  There isn't much I can do about dead-links, the best I could hope for is to get things off discord where things rot _really_ fast.  I'm trying to fight this as best as I can, but there are limits.  

All artists retain their respective intellectual rights about their works.  This is merely an index.  

~~This archive is not endorsed by Abaddon, KSBD, or the OCT team.~~ At this point the map has been endorsed several ways to Sunday, but it is important to point out that this archive effort and the OCT are different projects by different people, and are not affiliated with each other.   

## A Note on Record Keeping

Due to the fact that the tournament is run for humans, by humans, means some peculiarities are not captured here.  If items or special rules are invoked, those will be mentioned.  However, some events, such as defaults, expulsions, or special judgements are not recorded.  If infractions or events force an outcome on the board, the outcome alone is recorded (though with defaults, you might figure out what happened due to lack of links).  If the events don't affect the board, they are not recorded at all.

Some comics, such as interludes and judge comics, are tracked in order to preserve narrative flow, despite the fact that they technically don't affect the map per se. However, these are backfilled to historically important figures as I deem fit.  

Some characters have been merged to preserve narrative flow, despite becoming very different characters later.  For example, Prisoner Tallshark is listed under Razzberry Tallshark.  

I could not track cameos.  It would break me.

## Are you a War For Rayuba Combatant Artist?

There were so, _so_ many contestants, each with their own thoughts and feelings about their own work.  For that reason, there was a survey that was used to build an extended database of those participants.  The main thing, though, is that they are all _opt-in_.  

If you want to see your character entry expanded, please contact Archivist Black on the W4R discord.  I can't guarantee you will see your changes added in a timely manner, but I will add them to the hopper.  

## Making changes

This archival effort was designed to be a longstanding archive solution that requires me to touch it as little as possible.  For that reason, basically only serious quality of life issues and bugs will be addressed.  

If you are not familiar with how GitHub works, feel free to reach out to Mr.Black on the WFR Discord server and we can talk about it.

I encourage people to interact with this project as GitHub allows: make issues, pull-requests, forks, I'll be receptive to them.  However, the map graphics themselves are :copyright: Tom Parkinson-Morgan i.e. Abaddon ~~(heck, I probably should get more explicit permission myself)~~ I basically have permission now for this limited purpose.

### Building and running.

This website runs off of Vue 2 with some help from Vue-CLI (which is an npx install).  A custom GitHub action publishes the website to GitHub pages upon merges to `main`.  

You will need to run your favorite `npm` (I am using npm v15.8.0) tool in order to run.  Once pulled down from git, `npm install` will get dependencies. `npm run serve` will launch the developer instance and admin server, allowing use of the `\chars` admin endpoint.  

The website requires no external access beyond the original npm download, all the data is local .json files.  

## Roadmap

- [x] Reading list tracking
- [x] Rule lookup
- [x] Round reading list
- [x] Battle item tracking
- [x] Mobile support
- [x] Character stories

## Other Things

### Why is there no artist info for XYZ character?

I only know most of these people by their Discord presence, which makes things tricky.

What's done and said on a Discord server, even a public one, has different weight than when it is on a website that may get crawled by search engines.  Suddenly, the Internet has access to what was originally thought to be a limited set of people.  This is an invitation for potentially bad actors, and I don't want to open that up to people unless they are ready.

To complicate matters, Discord server names are really nicknames.  Many of the artists (lookin at you, GUN) have changed their names _wildly_ over the course of the OCT.  Which one should I choose?  On the other hand, Discord handles (they look like NAME#1234) are _functionally phone numbers_ that would allow random people from the internet to DM artists.  This is why the survey asks artists how they want to be known, if at all. 

Some of the participants want their works forgotten afterward, and that is their right.  

### My character information is wrong/missing/incomplete

A quick reminder, only characters who affected the board _in any way_ are recorded.  Grand Battles did count, so make sure that it's in there correctly!  

If I completely whiffed on something, I encourage you to make a github issue or contact Mr. Black on the WFR Discord.  

### I don't want my comics listed here

That is your right.  Contact me through a GH issue or contact Mr.Black on Discord.  Please note, to be fair to your opponent (where applicable), your character's info will not be scrubbed.  I may retain a local copy for archival purposes, but make it non-accessible. 

## Special Thanks

Thanks to Amanda, for without you the map would still be 196 missing images.

Thanks to anyone who contributes to the round summary spreadsheets, without which this project wouldn't even be conceivable. 

Thanks to Cpt.M3thyl for allowing your airtable and my DB to cross-pollinate.  

Thanks to the CAPTAINS, WITNESSES, and EMISSARYS that made this OCT possible.  
