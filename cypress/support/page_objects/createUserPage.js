
export class User{

    createNewUser(name, switchBtn, email, inputNumber, year){
        
        this.name = name
        this.switchBtn = switchBtn
        this.email = email
        this.inputNumber = inputNumber
        this.year = year
    
        cy.get('[placeholder="name"]').type(name)

        if(switchBtn == true) {
          cy.get('[data-test="form-switch-input"]').click()
        }
        
        cy.get('[placeholder="email@email.com"]').type(email)
       
        cy.get('[role="spinbutton"]').type(inputNumber)
    
        cy.get('[placeholder="Select year"]').click().type(year)
        
        cy.get('form[id="form name"]').click()

        // I also tried to automate year selection using navigaton buttons. The idea was to put the
        // ant-picker-content table into then() and then compare the year given by user to the first and the last 
        // visible year in the table. If the user year was lower than the first element in the table (tr(0)td(0))
        // then we would go inside if() statement where we would click left arrow. The function should then recall 
        // itself until the user's year is no longer lower than the first year on the table (creating some sort of
        // a while loop). The next if() statement would check if user's year is higher than the last visible year
        // of the table (tr(-1)td(-1)). The logic would be the same. Finally, when both if() statements would be passed
        // it would mean the users year is now visible in the table and we can click it in 'else' statement. 
        // 
        // Wish my Cypress skills were better to pull this off though. Need more practice :)
    
        cy.get("#submit").click()
        
        cy.get('[class="ant-message-custom-content ant-message-success"]').should('contain', 'cool, it is done')
        
        // For some reason this assertion did not work
        // cy.on('window:alert', (text) => {
        //   expect(text).to.contains('cool, it is done')
        // })
    
        cy.get('[data-test="submission-container"]').find('[data-test="item-undefined"]').then( userForm => {
          expect(userForm.find('[data-test="item-undefined-name"]').text()).to.contains(name)
          expect(userForm.find('[class="item-undefined-switch"]').text()).to.contains(switchBtn)
          expect(userForm.find('[class="item-undefined-email"]').text()).to.contains(email)
          expect(userForm.find('[class="item-undefined-input"]').text()).to.contains(inputNumber)
          expect(userForm.find('[class="item-undefined-year"]').text()).to.contains(year)
        })

    }

        wrongInput(wrongEmail, wrongInputNumber){

            this.wrongEmail = wrongEmail
            this.wrongInputNumber = wrongInputNumber

            cy.get('[placeholder="email@email.com"]').type(wrongEmail)
            cy.get("#submit").click()
            cy.get('[class="ant-message-custom-content ant-message-error"]').should('have.text', "email doesn't have @")
        
            cy.get('[role="spinbutton"]').type(wrongInputNumber)
            cy.get('[role="alert"]').should('have.text', 'Maximum number is 100')
            
        }

}

export const newUser = new User()