import webbrowser


class Movie():
    """This class stores movie related information and shows their trailers."""
    
    def __init__(self, title=0, storyline=0, poster_url=0, trailer_url=0):
        """ Initializes a movie object.
        
        Args:
            title (str): title of movie 
            storyline (str): short description of movie
            poster_url (str): url of the movie poster image
            trailer_url (str): url of the movie trailer on youtube
            
        """
        self.title = title
        self.storyline = storyline
        self.poster_image_url = poster_url
        self.trailer_youtube_url = trailer_url
    

    def show_trailer(self):
        """Opens up a webbrowser showing its trailer."""
        webbrowser.open(self.trailer_youtube_url)
