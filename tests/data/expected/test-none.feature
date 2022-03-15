@tag1 @tag2 @tag3
Feature: Name

  This is a multiline
  Feature description

  @tag1 @tag2
  Rule: Name

    This is a multiline
    Rule description

    Background: Name

      This is a multiline
      Background description

      Given step
      When step
      Then step

    @tag1 @tag2
    Scenario: Name

      This is a multiline
      Scenario description

      Given step
        """
        docstring
        other docstring
        """
      When step
        | data  | table |
        | value | value |
        | value | value |
      Then step
        """markdown
        title
        =====
        docstring with content type
        """
      And step
        ```markdown
        docstring with backtick and content type
        ```

    @tag1 @tag2
    Scenario Outline: Name

      This is a multiline
      ScenarioOutline description

      Given step <v>
      When step <w>

      @tag1 @tag2
      Examples: Name
        | v | w |
        | 1 | 2 |
        | 2 | 3 |