Higher level features
1. Create  the option for people to listen for certain heroes. allow them to main any amount of heroes so instead of returning
 the final score of every single hero it just returns the scores of the heroes they main
 Make this toggleable between main heroes and all heroes so they still have access to the rest of the data
2. Add coop and counter pick sliders in general that normalize to 1
	2a. add a coop/counterpick slider for each hero so i dont have
	    to take into consideration weak heros etc.






Dev/Bugs
- available property is not working properly as a picked hero will show up
- set up npm start to nodemon start my server
- make the scraper more stable
	-make the scraper grab either img files or image urls
	- to make scraper more stable i want to have a boolean for each request and a timeout that will resend any requests who still have a false boolean.
- implement a way to reclick a draft box if they accidentally click there by mistake
- figure out how to make the view with the roles more compact. Users shouldnt have to scroll. Maybe make the roles collapsable or replace the all heroes view or maybe allow them to maybe select up to four of the filter tabs(all heroes, listened for heroes, heroes by role)
-whether or not the heroes directive show depends at least on the loaded variable and wether or not the hero has been picked/banned so make a func that will check the various things but where do you put that in the link? or on main controller. but there is an isdrafted array in draftarea controller so we want to show if the hero isnt on hteir for most directives but of course the directives in the draft area will want to show for those heroes.
- 
