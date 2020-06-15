const chalk = require('chalk')
const inquirer = require('inquirer')

const Command = require('../../utils/command')

class BuildPluginCreateCommand extends Command {
  /*
    ✅. prompt for plugin name & where to save the plugin dir
    2. create a folder at {{path}} named {{name}} adding "netlify-plugin-" if not already added 
    3. make a manifest.yml file using {{name}} to populate "name: "
    4. create an index.js file w `module.exports ...` & all events 
    */
  async run() {
    const { api } = this.netlify
    let pluginName

    const inputPluginName = async (name) => {
      let userName = api.getCurrentUser()
      console.log(
        chalk.white.bold(
          `🤔 What is the name of your Build Plugin? (e.g. netlify-plugin-${userName.slug}-is-the-coolest)`
        )
      )
      const results = await inquirer.prompt({
        type: 'input',
        name: 'name',
        validate: (input) => /^[a-zA-Z0-9-]+$/.test(input) || 'Only alphanumeric characters and hyphens are allowed',
      })

      pluginName = results.name

      if (pluginName.substring(0, 15) !== 'netlify-plugin-') {
        pluginName = 'netlify-plugin-' + pluginName
      }

      console.log(chalk.greenBright.bold('Your plugin is named: ', pluginName))
    }

    await inputPluginName()
  }
}

BuildPluginCreateCommand.description = ['Creates a Build Plugin directory and base files.']
BuildPluginCreateCommand.aliases = ['buildplugin:create']
module.exports = BuildPluginCreateCommand
