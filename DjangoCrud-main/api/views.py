from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import TaskSerializer
from crudapp.models import Task

@api_view(['GET'])
def getTodos(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTodo(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createTodo(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT', 'POST'])
def updateTodo(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance = task , data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTodo(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Todo deleted successfully')