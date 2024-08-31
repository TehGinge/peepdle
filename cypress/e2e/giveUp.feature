Feature: Give Up

  Background:
    Given I am on the Peepdle homepage

  Scenario Outline: Able to select the Give Up button with 0-4 entered words
    Given I have guessed <guessCount> words
    When I Give Up
    Then the Give Up screen is displayed
    And the word is revealed

    Examples:
      | guessCount |
      | 0          |
      | 1          |
      | 2          |
      | 3          |
      | 4          |

  Scenario: Give Up is automatically triggered after reaching the word limit of 5
    Given I have guessed a word 5 times
    Then the Give Up screen is displayed
    And the word is revealed

  Scenario: Give Up only affects Win Streak and not Personal Best
    Given I have made 1 correct guess
    And I have continued to the next word
    When I Give Up
    Then the Give Up screen is displayed
    And my Win Streak is kept at 1 in the Give Up screen
    And my current Win Streak is reset to 0 in the header
    And my Personal Best has not been reset
