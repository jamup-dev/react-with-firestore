## Install VSCode

Go to [VSCode](https://code.visualstudio.com/) and install the editor. We will
need following extensions.

1. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   for code formatting.
2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   for in-editor linting experience.
3. [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
   for showing size of imported modules.

## Install Git

Install Git for your OS from the [official site](https://git-scm.com/downloads).

If you are on Windows, then from now on, we will use Git Bash (found from Start Menu)
as our terminal. For Linux or OSX, use your preferred terminal with Bash or ZSH.

To verify git, run the following in your Terminal.

```bash
git --version
```

### Configure Git for the first time

First we configure username and email.

```bash
git config --global user.name "My Name"
git config --global user.email "my-name@gmail.com"
```

Now we generate SSH key and setup in GitHub or GitLab or our preferred site.

First check whether you have existing SSH keys or not. To do so, run

```bash
ls -al ~/.ssh
```

You will know you have SSH keys if the following files show up.

- `id_rsa`
- `id_rsa.pub`

If not, then continue, other-wise skip to adding SSH key to GitHub.

To generate SSH, run

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

This will give you the needed files. Now check the content of `id_rsa.pub`

```bash
cat ~/.ssh/id_rsa.pub
```

More information can be [found here](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### Add SSH key to GitHub

Follow the official instructions from [here](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account).

### Basic GIT Commands

We will mostly use the following commands in our day to day job.

**Stage changed files**

```bash
git add -A
```

**Commit staged files**

```bash
git commit -m "commit message"
```

**Push changes to remote**

```bash
git push origin
```

**Pull changes from remote**

```bash
git pull origin
```

For more information check [this tutorial](https://guides.github.com/introduction/git-handbook/)
or [this cheat sheet](https://github.com/joshnh/Git-Commands).

### Using VIM

- Press `i`.
- Write down your commit.
- Get back to the command mode by pressing `ESC`.
- In command mode, write `:wq` and press enter.
- If at any point, we want to quit, then go to command mode, and we write `:cq`.

## Basic UNIX commands

Remember to use Git Bash on Windows. Linux or OSX users should be good with
default or custom terminal running Bash or ZSH.

### Navigating through directory

```bash
cd /absolute/path/to/dir
pwd
# Should output /absolute/path/to/dir
cd relative/path/to/dir
pwd
# Should output /absolute/path/to/dir/relative/path/to/dir
# To go back one level up
cd ..
pwd
# Should output /absolute/path/to/dir/relative/path/to
```

### Managing directory and file

```bash
# To create a directory
mkdir my-directory-name
# To recursively create a directory
mkdir -p relative/new/path/to/dir

# To create a file
touch newfile.md

# To delete a file
rm newfile.md

# To delete a non-empty directory
rm -rf relative
```

## Install Nodejs and Yarn package manager

Install NodeJS LTS (10.16.3 at the time of writing) from [official site](https://nodejs.org/en/).

To verify run the following in terminal

```bash
node --version
```

### Using Node for the first time

Now create a file `hello-world.js` with the following content

```js
console.log('Hello World');
```

And run the command

```bash
node hello-world.js
```

### Using YARN Package Manager

On the same directory, run

```bash
yarn init
```

and go through the questions. This will initialize a `package.json` file. Now
install our very first package.

```bash
yarn add systeminformation
```

Create a file os.js and write the following.

```js
const si = require('systeminformation');

si.cpu().then(cpuData => {
  console.log('CPU DATA');
  console.log('--------');
  console.log(JSON.stringify(cpuData, null, 4));
});
```

Now run it with

```bash
node os.js
```

And it should show you information.

Congratulations, you now have used Node, Yarn and a third-party package.
