## ADDED Requirements

### Requirement: Generate seed posts using Bogus
The PostSeeder class SHALL provide a method to generate 50 seed posts using the Bogus library. Each seed post title SHALL contain the string "[Seed Data]". Slug SHALL be auto-generated from title. Description SHALL be auto-generated from content (first 300 characters + "..."). Published SHALL be randomly true or false. DateCreated and DateUpdated SHALL be set to DateTime.Now. Before generating new seed posts, all existing posts with "[Seed Data]" in the title SHALL be deleted.

#### Scenario: Generate 50 seed posts
- **WHEN** PostSeeder.SeedPosts() is called
- **THEN** 50 new posts with "[Seed Data]" in the title are created in the database

#### Scenario: Clean up old seeds before generating
- **WHEN** PostSeeder.SeedPosts() is called and 20 existing "[Seed Data]" posts exist
- **THEN** the 20 existing seed posts are deleted and 50 new ones are created

### Requirement: Delete seed posts
The PostSeeder class SHALL provide a method to delete all posts with "[Seed Data]" in the title. The method SHALL return the count of deleted posts.

#### Scenario: Delete all seed posts
- **WHEN** PostSeeder.DeleteSeedPosts() is called with 50 seed posts in database
- **THEN** all 50 posts with "[Seed Data]" in the title are deleted

#### Scenario: No seed posts to delete
- **WHEN** PostSeeder.DeleteSeedPosts() is called and no "[Seed Data]" posts exist
- **THEN** no posts are deleted and the method returns 0

### Requirement: Seed data trigger buttons in Config page
The admin Config page SHALL display two buttons: "Tạo Seed Data" and "Xóa Seed Data". Clicking "Tạo Seed Data" SHALL call PostSeeder.SeedPosts() and display a toast with the count of created posts. Clicking "Xóa Seed Data" SHALL call PostSeeder.DeleteSeedPosts() and display a toast with the count of deleted posts.

#### Scenario: Create seed data from Config page
- **WHEN** admin clicks "Tạo Seed Data" button
- **THEN** 50 seed posts are created and a success toast shows "Đã tạo 50 bài viết seed"

#### Scenario: Delete seed data from Config page
- **WHEN** admin clicks "Xóa Seed Data" button
- **THEN** all seed posts are deleted and a success toast shows "Đã xóa X bài viết seed"
