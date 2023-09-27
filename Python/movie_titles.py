import requests, gzip, os

url = 'https://datasets.imdbws.com/title.ratings.tsv.gz'
filename = 'title.ratings.tsv.gz'
output_filename = 'titles.tsv'
minimum_votes = 100_000

def download_data(url, filename):
    r = requests.get(url, allow_redirects=True)
    with open(filename, 'wb') as f:
        f.write(r.content)

def extract_data(filename, output):
    with gzip.open(filename, 'rb') as gzipped_file:
        with open(output_filename, 'wb') as output:
            for line in gzipped_file:
                output.write(line)

def delete_file(filename):
    os.remove(filename)

def rename_file(filename, new_filename):
    os.rename(filename, new_filename)

def read_lines(tsv_file_name):
    with open(tsv_file_name, 'r') as f:
        lines = f.readlines()
        return lines

def keep_required_titles(lines, minimum_votes):
    f = open('required.tsv', 'w')
    for line in lines:
        if 'tt' in line:
            votes = int(line.split('\t')[-1])
            if votes > minimum_votes:
                f.write(line.split('\t')[0] + '\n')
    f.close()

    # Remove the last empty line from the file
    with open('required.tsv', 'rb+') as f:
        f.seek(-1, os.SEEK_END)
        f.truncate()

if __name__ == '__main__':
    download_data(url, filename)
    extract_data(filename, output_filename)
    delete_file(filename)
    lines = read_lines(output_filename)
    keep_required_titles(lines, minimum_votes)
    delete_file(output_filename)
    rename_file('required.tsv', 'movie_ids.txt')