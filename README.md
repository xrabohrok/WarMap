# The War For Rayuba War Archive

[The blood of war stains history.](https://xrabohrok.github.io/WarMap)

## Are you a War For Rayuba Combatant Artist?

I need your help!  There are currently 265 combatants to track, and I am only one person! When you have a moment, please fill out a survey about you and your character so it is recorded correctly!

Please note: While I go on a screed about Discord handles later in this README, I do ask for your Discord handle.  I will not be publishing or otherwise publicly post your Discord handle on the website, but I do need it so I can cross-reference info and DM you for clarification (it would be a DM from Westin).  

If you are an artist that has contributed to WFR, the following surveys will allow you to affect how your character is displayed on the map (and let you take credit!).
If you know how it works, you can also detail your changes in a GitHub issue.  

Character and Artist registry:
https://forms.gle/zSyjAVn6BK3MWz2j8

Character Picture Upload:
https://forms.gle/DrMrw8korwJiWRTt8

Correction Request

## What is this?

In January 2021, Tom Parkinson-Morgan/Abaddon of Kill Six Billion Demons (KSBD) fame announced he would run a second Original Character Tournament, [The War For Rayuba](https://killsixbilliondemons.com/war-for-rayuba-is-now-live/) .  Instead of being a tournament bracket format, this OCT would instead have a wargame setup with a map and environments that must be accounted for.  However, the additonal complexity of this setup makes following along somewhat difficult.  

This project has three goals:

1. Make painfully obvious what happened, when, where, with who  
1. Track what you have read and what you still need to
1. Archive in a usable and stable way the works that are generated from this OCT
    1. b. Encourage participants to put their comics in longer lasting locations

Discord keeps links to uploaded pictures as long as they aren't "orphaned" (i.e. are still linked to from somewhere).  A lot of the previous OCT (Ring of Power) has been functionally lost due to channel cleanup and discord server channel count limits.  Providing incentives for people to upload their work to more stable hosting is a small step to avoiding this fate again.  

## What this is NOT

**This is not your source for up-to-date WFR information**. Think of this more like an interactive history book tool. The source for what is happening currently in the OCT is still the discord channel itself and the enthusiastic members of the community who create, maintain, and publish tracking spreadsheets.  Information on this War Map lags behind round results by about a week, and some information is still not included yet.

Due to the limits of Github pages, this site cannot _host_ these comic works, but it can at least be an index to find them.  As a single person who is not equipped to sort out intellectual rights of the 265 fighters (_so far_), this suits me just fine.

This archive is not endorsed by Abaddon, KSBD, or the OCT team.  

## A Note on Record Keeping

Due to the fact that the tournament is run for humans, by humans, means some peculiarities are not captured here.  If items or special rules are invoked, those will be mentioned.  However, some events, such as defaults, expulsions, or special judgements are not recorded.  If infractions or events force an outcome on the board, the outcome alone is recorded (though with defaults, you might figure out what happened due to lack of links).  If the events don't affect the board, they are not recorded at all.

Some characters have been merged to preserve narrative flow, despite becoming very different characters later.  For example, Prisoner Tallshark is listed under Razzberry Tallshark.  

I cannot track cameos.  It would break me.

## Making changes

As the OCT progresses I am open to any good-faith suggestions and changes.  Knowing myself, once the OCT is over the capcity for changes will be minimal.  Of special appreciation would be web-design advice and help with the CSS styles; while I know them I am not the best at them.

If you are not familiar with how GitHub works, feel free to reach out to Mr.Black on the WFR Discord server and we can talk about it.

I encourage people to interact with this project as GitHub allows: make issues, pull-requests, forks, I'll be receptive to them.  However, the map graphics themselves are :copyright: Tom Parkinson-Morgan i.e. Abaddon (heck, I probably should get more explicit permission myself).

### Building and running.

This website runs off of Vue 2 with some help from Vue-CLI.  A custom GitHub action publishes the website to GitHub pages upon merges to `main`.  

You will need to run your favorite `npm` (I am using npm v15.8.0) tool in order to run.  Once pulled down from git, `npm install` will get dependencies. `npm run serve` will launch the developer instance and admin server, allowing use of the `\chars` admin endpoint.  

The website requires no external access beyond the original npm download, all the data is local .json files.  

## Roadmap

- [x] Reading list tracking
- [ ] Rule lookup
- [ ] Round reading list
- [ ] Battle item tracking
- [ ] Mobile support

## Other Things

### Why is there no artist information? Why are you cagey about some details?

Let's talk about internet presence.

What's done and said on a Discord server, even a public one, has different weight than when it is on a website that may get crawled by search engines.  Suddenly, the Internet has access to what was originally thought to be a limited set of people.  This is an invitation for potentially bad actors, and I don't want to open that up to people unless they are ready.

To complicate matters, Discord server names are really nicknames.  Many of the artists (lookin at you, GUN) have changed their names _wildly_ over the course of the OCT.  Which one should I choose?  On the other hand, Discord handles (they look like NAME#1234) are _functionally phone numbers_ that would allow random people from the internet to DM artists.  This is why the survey asks artists how they want to be known, if at all.  It is ok if you decide not to provide any contact/social media info, but I encourage you to at least choose a name for yourself.  

### My character information is wrong/missing/incomplete

A quick reminder, only characters who affected the board _in any way_ are recorded.  If you want to wind up in the record, do a grand battle, that counts!  

If I completely whiffed on something, I encourage you to fill out the change survey above, make a github issue, or contact Mr. Black on the WFR Discord.  

### I don't want my comics listed here

That is your right.  Contact me through a GH issue or contact Mr.Black on Discord.  Please note, to be fair to your opponent (where applicable), your character's info will not be scrubbed.  

## Special Thanks

Thanks to Amanda, for without you the map would still be 196 missing images.

Thanks to anyone who contributes to the round summary spreadsheets, without which this project wouldn't even be conceivable. 

Thanks to the CAPTAINS, WITNESSES, and EMISSARYS that made this OCT possible.  
