Feature: User registration

  Scenario: Successful registration
    Given the user is on the registration page
    When the user registers with username "newUser" and password "newPass123"
    Then the user should see a success message

  

  Scenario Outline: Registration with invalid inputs
    Given the user is on the registration page
    When the user registers with username "<username>" and password "<password>"
    Then the user should see a validation error "<error>"

    Examples:
      | username    | password    | error                         |
      |            | newPass123  | Username is required          |
      | userX       |            | Password is required          |
      | ab          | 123         | Username must be at least 3 characters |
