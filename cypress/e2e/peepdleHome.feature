Feature: Peepdle Homepage

  Background:
    Given I am on the Peepdle homepage

  Scenario: Visit the Peepdle homepage
    Then the title should contain "peepdle"

  Scenario: Verify the presence of elements on the Peepdle homepage
    Then a quote is displayed, with a word required to guess
    And a word grid is displayed
    And a keyboard is displayed
    And a 'Give Up' button is displayed
    And a 'Use Hint' button is displayed
    And a 'Skip' button is displayed

  Scenario: Verify the presence of elements in Give Up state
    When I Give Up
    Then the Give Up screen is displayed
    And the full quote is displayed in the Give Up screen
    And my Win Streak is displayed in the Give Up screen
    And my Personal Best is displayed in the Give Up screen
    And I can select Next Word to continue the game