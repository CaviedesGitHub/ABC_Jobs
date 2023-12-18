import { defineConfig } from 'cypress'
//http://localhost:4200   
//http://frontendabc-env.eba-txewrwr8.us-east-2.elasticbeanstalk.com/abc-jobs/en-US/

export default defineConfig({
  
  e2e: {
    'baseUrl': 'http://localhost:4200'
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})