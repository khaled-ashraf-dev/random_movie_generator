import requests
from tinydb import TinyDB, Query

def read_movie_ids(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file]

def clean_data(data):
    data_dict = data
    data_dict['Year'] = int(data_dict['Year'][:4])
    data_dict['imdbRating'] = float(data_dict['imdbRating'])
    data_dict['imdbVotes'] = int(data_dict['imdbVotes'].replace(',', ''))
    return data_dict

def fetch_movie_data(api_key, imdb_ids, max_count=1000):
    omdb_db = TinyDB('movie_data.json')
    movie_api_responses = []

    for i, imdb_id in enumerate(imdb_ids[:max_count]):
        api_full_url = f'http://www.omdbapi.com/?apikey={api_key}&i={imdb_id}'
        response = requests.get(api_full_url).json()
        cleaned_data = clean_data(response)
        movie_api_responses.append(cleaned_data)
        print(f'Retrieved data for movie {i + 1}/{max_count}')

    omdb_db.insert_multiple(movie_api_responses)

if __name__ == "__main__":
    api_key = '6777025a'
    movie_ids = read_movie_ids('movie_ids.txt')
    fetch_movie_data(api_key, movie_ids, max_count=1000)