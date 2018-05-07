import media
import fresh_tomatoes

# open text file of favorite movies
file_name = "favorite_movies"
file = open(file_name, "r")

list_of_movies = []                            # list of movie objects

new_movie = media.Movie()
count = 4

# Traverse file to make movie objects for list
for line in file:
    if (count == 0):                           # If finished a movie object
        list_of_movies.append(new_movie)
        new_movie = media.Movie()
        count = 5
    elif (count == 4):                         # If line is title
        new_movie.title = line
    elif (count == 3):                         # If line is storyline
        new_movie.storyline = line
    elif (count == 2):                         # If line is poster URL
        new_movie.poster_image_url = line
    else:                                      # If line is trailer URL
        new_movie.trailer_youtube_url = line
    count -= 1

# Check if we have any favorite movies
if (not len(list_of_movies)):
    print ("No Favorite Movies :(")

fresh_tomatoes.open_movies_page(list_of_movies)
