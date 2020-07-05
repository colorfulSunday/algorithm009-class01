class Solution {

  private int L;
  private Map<String, List<String>> allComboDict;

  private int visitWordNode(
      Queue<Pair<String, Integer>> Q,
      Map<String, Integer> visited,
      Map<String, Integer> othersVisited) {

    Pair<String, Integer> node = Q.remove();
    String word = node.getKey();
    int level = node.getValue();

    for (int i = 0; i < this.L; i++) {
      String newWord = word.substring(0, i) + '*' + word.substring(i + 1, L);
      for (String adjacentWord : this.allComboDict.getOrDefault(newWord, new ArrayList<>())) {//这里不能直接用get,因为可能beginWord有新的通用状态。广度优先模板的遍历子节点这一步
        if (othersVisited.containsKey(adjacentWord)) {//另一边是否有这个单词
          return level + othersVisited.get(adjacentWord);//找到了
        }
        if (!visited.containsKey(adjacentWord)) {//没有找到，这一边加入这个单词
          visited.put(adjacentWord, level + 1);
          Q.add(new Pair(adjacentWord, level + 1));
        }
      }
    }
    return -1;
  }

  public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    if (!wordList.contains(endWord)) {//单向这一个判断可以没有，双向必须有
      return 0;
    }
    
    this.L = beginWord.length();
    //存储通用状态字符串和当前通用状态的字典中的值
    this.allComboDict = new HashMap<>();
    wordList.forEach(
        word -> {
          for (int i = 0; i < L; i++) {//每个字符串都有L个通用状态
            String newWord = word.substring(0, i) + '*' + word.substring(i + 1, L);
            List<String> transformations = this.allComboDict.getOrDefault(newWord, new ArrayList<>());//获取当前通用状态的字典中已经遍历过的字符串
            transformations.add(word);
            this.allComboDict.put(newWord, transformations);
          }
        });

    //BFS模板
    Queue<Pair<String, Integer>> Q_begin = new LinkedList<>();
    Queue<Pair<String, Integer>> Q_end = new LinkedList<>();
    Q_begin.add(new Pair(beginWord, 1));//key为字符串，value为深度，即长度
    Q_end.add(new Pair(endWord, 1));

    Map<String, Integer> visitedBegin = new HashMap<>();//不同于单向广度优先遍历，不仅需要记录单词，还需要记录level
    Map<String, Integer> visitedEnd = new HashMap<>();
    visitedBegin.put(beginWord, 1);
    visitedEnd.put(endWord, 1);

    while (!Q_begin.isEmpty() && !Q_end.isEmpty()) {
      int ans = visitWordNode(Q_begin, visitedBegin, visitedEnd);
      if (ans > -1) {
        return ans;
      }
      
      ans = visitWordNode(Q_end, visitedEnd, visitedBegin);
      if (ans > -1) {
        return ans;
      }
    }

    return 0;
  }
}