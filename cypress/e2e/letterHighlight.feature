Feature: Highlighting Letters in Word Grid & Keyboard

  Background:
    Given I am on the Peepdle homepage

  Scenario: Letters are highlighted in Green if they ARE in the word and position
    When I correctly guess the word
    Then the correctly guessed letters on the Word Grid should be highlighted in 'Green'
    And the correctly guessed letters on the Keyboard should be highlighted in 'Green'

  Scenario: Letters are highlighted in Yellow if they are in the word BUT not in position
    When I partially guess the word
    Then the correctly guessed letters on the Word Grid should be highlighted in 'Yellow'
    And the correctly guessed letters on the Keyboard should be highlighted in 'Yellow'

  Scenario: Letters are highlighted in Grey if they are NOT in the word or position
    When I incorrectly guess the word
    Then the correctly guessed letters on the Word Grid should be highlighted in 'Grey'
    And the correctly guessed letters on the Keyboard should be highlighted in 'Grey'