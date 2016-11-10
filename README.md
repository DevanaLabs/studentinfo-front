# Student Info Frontend readme

## Getting Started

This guide will get get the frontend portion of the project up and running on your local machine for development and testing purposes. It is recommended to get the [API part](../student-info-api) set up first. 

## Prerequisites

For virtualization we use the `laravel/homestead` Vagrant box.

The installation instruction can be found at: [http://laravel.com/docs/homestead](http://laravel.com/docs/homestead). 

Some problems might exist when setting up Vagrant on Windows. [This page](http://sherriflemings.blogspot.rs/2015/03/laravel-homestead-on-windows-8.html) might provide some answers, if any problems arise. 

If you are installing both Student Info Api and Frontend be sure you put both projects in same directory. 
Example: 

- C:\Users\User\Projects\\__student-info__\\student-info-api
- C:\Users\User\Projects\\__student-info__\\student-info-frontend


## Installing

1. Clone this repository locally:
``` bash
git clone git@codebasehq.com:pmedia/student-info/student-info-frontend.git
``` 

2. Open 'Homestead.yaml' and add folder with your projects in which is your repository cloned 
``` yaml
folders:
    - map: C:\Users\User\Projects\student-info\
      to: /home/vagrant/Projects/student-info/
```

3. Add site to your 'Homestead.yaml' file:
``` yaml
sites: 
    - map: studentinfo.dev
      to: /home/vagrant/Projects/student-info/student-info-frontend/dist
```

4. Add a new database to your 'Homestead.yaml' file:
``` yaml
databases:
    - studentinfo
```

5. Add address to your 'hosts' file:
```
192.168.10.10   studentinfo.dev
```

6. In your Homestead directory run
``` bash
vagrant reload --provision
```

7. After vagrant reboots ssh into your vagrant box
``` bash
ssh vagrant@192.168.10.10
```

8. Change working directory to student-info-frontend
``` bash
cd ~/Projects/student-info-frontend
```

9. Run these few commands
``` bash
bower install
npm install --no-bin-links
gulp
```
The `--no-bin-links` flag for npm should only necessary when running Vagrant on a Windows host.  

If there is a problem with gulp and node-sass error such as 
```
Error: ENOENT: no such file or directory, scandir '**/node_modules/node-sass/vendor' 
```
try running these commands before continuing: 

``` bash
nodejs node_modules/node-sass/scripts/install.js

npm rebuild node-sass --no-bin-links
```

10. Visit studentinfo.dev in your browser 
