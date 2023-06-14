from git import Repo

PATH_OF_GIT_REPO = r'.'  # make sure .git folder is properly configured
COMMIT_MESSAGE = 'update'


def git_push():
    try:    
        repo = Repo(PATH_OF_GIT_REPO)
        repo.index.add(['data.jsonl'])
        repo.index.commit(COMMIT_MESSAGE)
        origin = repo.remote(name='origin')
        origin.push()
    except:
        print('Some error occured while pushing the code')    






