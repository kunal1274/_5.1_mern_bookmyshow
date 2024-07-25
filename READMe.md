Day 1 : GIT related Tasks

Organising the Apps.
First lets talk about the backend server

Step 1 : Lets create a folder . [ Naming the folder names with _x.y.z_stackname_appname ]
For eg. \_5_mern_allapps
\_5.1_mern_bookmyshow
\_5.1.1_server

The following package.json file is created automatically.

I would like to remove git init as there is some mistake … how to do it ?

If you want to revert a `git init` command, which initializes a new Git repository, you essentially want to remove all the traces of Git from your project directory. Here’s how you can do it:

1. **Delete the `.git` directory**:
   The `git init` command creates a `.git` directory in the root of your project. This directory contains all the metadata and repository information. To revert the initialization, you need to remove this directory.

   ### Using Command Line:

   - **Linux/Mac**:
     ```sh
     rm -rf .git
     ```
   - **Windows**:
     ```sh
     rmdir .git /s /q
     ```

   ### Using File Explorer:

   - **Windows**: Enable "Show hidden files, folders, and drives" in File Explorer options, then navigate to your project directory and delete the `.git` folder.
   - **Mac**: Show hidden files by pressing `Cmd` + `Shift` + `.` in Finder, then navigate to your project directory and delete the `.git` folder.
   - **Linux**: Open your file manager, enable showing hidden files (usually `Ctrl` + `H`), then navigate to your project directory and delete the `.git` folder.

2. **Verify the Removal**:
   After deleting the `.git` directory, your project will no longer be a Git repository. You can verify this by running:
   ```sh
   git status
   ```
   You should see an error message indicating that this is not a Git repository.

### Example:

```sh
# Navigate to your project directory
cd /path/to/your/project

# Remove the .git directory
rm -rf .git

# Verify that the repository has been removed
git status
```

By following these steps, you effectively revert the `git init` command and remove all version control from your project directory.

Now initialize it again.

Now from here we will follow the gh auth login directly through Terminal .. but you can do through the VS code integrated terminal as well.
Commands used are :
 gh auth login

The below steps will give you the way to generate auth token .

https://github.com/settings/tokens

For time being we have generate tokens classic rather than beta.

Now back to terminal ..

gh repo create \_5.1_mern_bookmyshow --public --source=. --remote=origin

Adding the README.md file .

Initial push

ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git add .
ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git add README.md
ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git branch -m "main"
ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git commit -m "2024-07-25_1352: Initial Push"
[main (root-commit) b684689] 2024-07-25_1352: Initial Push
3 files changed, 11 insertions(+)
create mode 100644 READMe.md
create mode 100644 \_5.1.1_server/.DS_Store
create mode 100644 \_5.1.1_server/package.json
ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git push -u origin "main"
Enumerating objects: 6, done.
Counting objects: 100% (6/6), done.
Delta compression using up to 10 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 752 bytes | 752.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/kunal1274/_5.1_mern_bookmyshow.git

- [new branch] main -> main
  branch 'main' set up to track 'origin/main'.
  ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow %

Lets briefly prepare the server ..
With installation of packages . go to server folder and then run the command .

ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1.1_server % npm install bcrypt cookie-parser cors dotenv express jsonwebtoken
mongodb mongoose nodemon uuid

change in package.json file

:: 1
Add index.js and modify it to run the server for the first time .

For simple :

import expressBMSInstance from “express”;

const appBMSInstance = expressBMSInstance();

const PORT = 3002;

appBMSInstance.listen(PORT,()=>{
console.log(`Express server has been setup and it is listening at Port ${PORT}.`);
})

For second git push we can do the following :

Before that gitignore should remove the files .

Given your project structure, where you have a parent directory containing both server and client subdirectories, each with their own `node_modules` directories, you need to set up your `.gitignore` file at the root of your Git repository to properly ignore the appropriate files and directories in both subdirectories.

Here's how to handle this scenario:

1. **Create a `.gitignore` file in the root of your Git repository**:
   This file will contain patterns to ignore files and directories for both the server and client projects.

2. **Add patterns to ignore `node_modules`, `.env`, and other common files**:

### Example `.gitignore` for Your Scenario:

```plaintext
# Ignore node_modules directories
_5.1.1_server/node_modules/
_5.1.2_client/node_modules/
_5.1.10_server/node_modules/

# Ignore environment variable files
_5.1.1_server/.env
_5.1.1_server/.env.local
_5.1.2_client/.env
_5.1.2_client/.env.local
_5.1.10_server/.env
_5.1.10_server/.env.local

# Ignore logs
*.log
_5.1.1_server/logs/
_5.1.2_client/logs/
_5.1.10_server/logs/

# Ignore build directories
_5.1.2_client/dist/
_5.1.10_server/build/

# Ignore OS generated files
.DS_Store
Thumbs.db

# Ignore IDE specific files
.vscode/
.idea/
```

### Steps to Apply the `.gitignore` File:

1. **Create or edit the `.gitignore` file in the root of your repository**:

   ```sh
   nano .gitignore
   ```

2. **Add the patterns provided above to the `.gitignore` file**.

3. **Save and close the file**.

4. **Remove any already tracked files that should be ignored**:
   If you have already committed files that should be ignored, you need to remove them from the index.

   ```sh
   git rm -r --cached _5.1.1_server/node_modules/
   git rm -r --cached _5.1.2_client/node_modules/
   git rm -r --cached _5.1.10_server/node_modules/
   git rm -r --cached _5.1.1_server/.env
   git rm -r --cached _5.1.1_server/.env.local
   git rm -r --cached _5.1.2_client/.env
   git rm -r --cached _5.1.2_client/.env.local
   git rm -r --cached _5.1.10_server/.env
   git rm -r --cached _5.1.10_server/.env.local
   ```

5. **Commit the changes**:
   ```sh
   git add .gitignore
   git commit -m "Add .gitignore to ignore node_modules, environment files, and build directories"
   ```

### Full Command Example:

```sh
# Navigate to your project root
cd /path/to/_5.1_mern_bookmyshow

# Create or edit the .gitignore file
nano .gitignore

# Add the ignore patterns

# Ignore node_modules directories
_5.1.1_server/node_modules/
_5.1.2_client/node_modules/
_5.1.10_server/node_modules/

# Ignore environment variable files
_5.1.1_server/.env
_5.1.1_server/.env.local
_5.1.2_client/.env
_5.1.2_client/.env.local
_5.1.10_server/.env
_5.1.10_server/.env.local

# Ignore logs
*.log
_5.1.1_server/logs/
_5.1.2_client/logs/
_5.1.10_server/logs/

# Ignore build directories
_5.1.2_client/dist/
_5.1.10_server/build/

# Ignore OS generated files
.DS_Store
Thumbs.db

# Ignore IDE specific files
.vscode/
.idea/

# Save and close the file (Ctrl+O to save, Ctrl+X to exit in nano)

# Remove already tracked files from the index
git rm -r --cached _5.1.1_server/node_modules/
git rm -r --cached _5.1.2_client/node_modules/
git rm -r --cached _5.1.10_server/node_modules/
git rm -r --cached _5.1.1_server/.env
git rm -r --cached _5.1.1_server/.env.local
git rm -r --cached _5.1.2_client/.env
git rm -r --cached _5.1.2_client/.env.local
git rm -r --cached _5.1.10_server/.env
git rm -r --cached _5.1.10_server/.env.local

# Add and commit the .gitignore file
git add .gitignore
git commit -m "Add .gitignore to ignore node_modules, environment files, and build directories"
```

This setup ensures that your Git repository ignores the specified directories and files, keeping your repository clean and focused on the source code.

First create the gitignore file ..

# Ignore node_modules directories

\_5.1.1_server/node_modules/
\_5.1.2_client/node_modules/
\_5.1.10_server/node_modules/

# Ignore environment variable files

\_5.1.1_server/.env
\_5.1.1_server/.env.local
\_5.1.2_client/.env
\_5.1.2_client/.env.local
\_5.1.10_server/.env
\_5.1.10_server/.env.local

# Ignore logs

\*.log
\_5.1.1_server/logs/
\_5.1.2_client/logs/
\_5.1.10_server/logs/

# Ignore build directories

\_5.1.2_client/dist/
\_5.1.10_server/build/

# Ignore OS generated files

.DS_Store
Thumbs.db

# Ignore IDE specific files

.vscode/
.idea/

Now run the following command .

git rm -r --cached \_5.1.1_server/node_modules/
git rm -r --cached \_5.1.2_client/node_modules/
git rm -r --cached \_5.1.10_server/node_modules/
git rm -r --cached \_5.1.1_server/.env
git rm -r --cached \_5.1.1_server/.env.local
git rm -r --cached \_5.1.2_client/.env
git rm -r --cached \_5.1.2_client/.env.local
git rm -r --cached \_5.1.10_server/.env
git rm -r --cached \_5.1.10_server/.env.local

ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git add .
ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git branch -m "2024-07-25_1448"
ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git commit -m "2024-07-25_1448_git ignore files has been created ,node js ready"

ratxensolutionspvtltd@ratxens-MacBook-Pro \_5.1_mern_bookmyshow % git push -u origin "2024-07-25_1448"
