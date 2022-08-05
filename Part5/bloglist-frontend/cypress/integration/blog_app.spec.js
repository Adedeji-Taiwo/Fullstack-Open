describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Adedeji Taiwo',
            username: 'deejay',
            password: 'passkey'
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });


    it('Login form is shown', function() {
        cy.contains('login').click();
        cy.contains('cancel');
    });


    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click();
            cy.get('#username').type('deejay');
            cy.get('#password').type('passkey');
            cy.get('#login-button').click();

            cy.get('.success')
                .should('contain', 'login successful')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('have.css', 'border-style', 'solid');


            cy.get('html').should('contain', 'Adedeji Taiwo logged in');
        });

        it('fails with wrong credentials', function() {
            cy.contains('login').click();
            cy.get('#username').type('deejay');
            cy.get('#password').type('wrong');
            cy.get('#login-button').click();

            cy.get('.error')
                .should('contain', 'login failed')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid');

            cy.get('html').should('not.contain', 'Adedeji Taiwo logged in');
        });
    });


    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'deejay', password: 'passkey' });
        });


        it('A blog can be created', function() {
            cy.createBlog({
                title: 'Person of Influence',
                author: 'Williams Godswill',
                url: 'https://flint.com/goodread',
                likes: 0
            });


            cy.get('html')
                .should('contain', 'Person of Influence -Williams Godswill')
                .and('contain', 'view');
        });

        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'first blog',
                    author: 'cypress',
                    url: 'https://www.new.com/',
                    likes: 0
                });
                cy.createBlog({
                    title: 'second blog',
                    author: 'cypress',
                    url: 'https://www.new.com/',
                    likes: 14
                });
                cy.createBlog({
                    title: 'third blog',
                    author: 'cypress',
                    url: 'https://www.new.com/',
                    likes: 7
                });
            });

            it('Users can like a blog', function() {
                cy.contains('first blog').parent().find('button').click();
                cy.contains('first blog').parent().find('button')
                    .should('contain', 'hide');


                cy.wait(3000);
                cy.get('html')
                    .should('contain', 'first blog -cypress')
                    .and('contain', 'https://www.new.com/')
                    .and('contain', '0 likes');



                cy.get('#like').click();
                cy.wait(1000);
                cy.get('html')
                    .should('contain', 'You liked first blog by cypress')
                    .and('contain', '1 like')
                    .and('contain', 'Adedeji Taiwo')
                    .and('contain', 'delete');
            });
        });

        describe('blogs are ordered according to likes', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'The title with the least most likes',
                    author: 'cypress',
                    url: 'https://www.new.com/',
                    likes: 7
                });
                cy.createBlog({
                    title: 'The title with the most likes',
                    author: 'cypress',
                    url: 'https://www.new.com/',
                    likes: 12
                });
                cy.createBlog({
                    title: 'The title with the second most likes',
                    author: 'cypress',
                    url: 'https://www.new.com/',
                    likes: 12
                });
            });




            it.only('with the blog with the most likes being first', function() {
                cy.contains('The title with the most likes').parent().find('button').click();
                cy.get('#like')
                    .click()
                    .wait(500)
                    .click()
                    .wait(500)
                    .click();
                cy.contains('hide').click();

                cy.contains('The title with the second most likes').parent().find('button').click();
                cy.get('#like')
                    .click()
                    .wait(500)
                    .click();
                cy.contains('hide').click();

                cy.contains('The title with the least most likes').parent().find('button').click();
                cy.get('#like')
                    .click()
                    .wait(500)
                    .click()
                    .wait(500)
                    .click()
                    .wait(500)
                    .click();
                cy.contains('hide').click();


                cy.get('.mini-blog').eq(0).should('contain', 'The title with the most likes');
                cy.get('.mini-blog').eq(1).should('contain', 'The title with the second most likes');
                cy.get('.mini-blog').eq(2).should('contain', 'The title with the least most likes');
            });
        });


    });

});