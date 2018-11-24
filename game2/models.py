from django.db import models


# Create your models here.
class Teams(models.Model):
    name = models.TextField(verbose_name='队伍名称', )
    logo = models.URLField(verbose_name='队伍头像', blank=True, default='http://src.1zlab.com/gac/gac-logo.jpg')
    number = models.IntegerField(verbose_name='队伍编号', blank=True, default=0)

    score_round1 = models.FloatField(
        verbose_name='第一轮成绩', blank=True, default=0)
    rank_round1 = models.IntegerField(
        verbose_name='第一轮排名', blank=True, default=0)

    score_round2 = models.FloatField(
        verbose_name='第二轮成绩', blank=True, default=0)
    rank_round2 = models.IntegerField(
        verbose_name='第二轮排名', blank=True, default=0)

    score_round3 = models.FloatField(
        verbose_name='第三轮成绩', blank=True, default=0)
    rank_round3 = models.IntegerField(
        verbose_name='第三轮排名', blank=True, default=0)

    score_round4 = models.FloatField(
        verbose_name='第四轮成绩', blank=True, default=0)
    rank_round4 = models.IntegerField(
        verbose_name='第四轮排名', blank=True, default=0)

    score_round5 = models.FloatField(
        verbose_name='第五轮成绩', blank=True, default=0)
    rank_round5 = models.IntegerField(
        verbose_name='第五轮排名', blank=True, default=0)

    trend = models.IntegerField(verbose_name='趋势', blank=True, default=1)
    score = models.FloatField(verbose_name='总成绩', blank=True, default=0)
    rank = models.IntegerField(verbose_name='总排名', blank=True, default=0)

    def __str__(self):
        return '%s 第 %s 名' % (self.name, str(self.rank))

    def _get_current_info(self, round):
        if round == 1:
            return self.rank_round1, self.score_round1, self.rank, self.score, self.name, self.number, self.trend

        elif round == 2:
            return self.rank_round2, self.score_round2, self.rank, self.score, self.name, self.number, self.trend

        elif round == 3:
            return self.rank_round3, self.score_round3, self.rank, self.score, self.name, self.number, self.trend

        elif round == 4:
            return self.rank_round4, self.score_round4, self.rank, self.score, self.name, self.number, self.trend

        elif round == 5:
            return self.rank_round5, self.score_round5, self.rank, self.score, self.name, self.number, self.trend

    def current_info(self, round):
        info = self._get_current_info(int(round))
        print(info)
        return {
            'rank_round': info[0],
            'score_round': info[1],
            'rank': info[2],
            'score': info[3],
            'name': info[4],
            'number': info[5],
            'trend': info[6]
        }

    def set_round_info(self, round, data):
        if round == 1:
            self.score, self.score_round1, self.rank, self.rank_round1, self.trend = data

        elif round == 2:
            self.score, self.score_round2, self.rank, self.rank_round2, self.trend = data

        elif round == 3:
            self.score, self.score_round3, self.rank, self.rank_round3, self.trend = data

        elif round == 4:
            self.score, self.score_round4, self.rank, self.rank_round4, self.trend = data

        elif round == 5:
            self.score, self.score_round5, self.rank, self.rank_round5, self.trend = data


        self.save()

    class Meta:
        verbose_name = '队伍'
        verbose_name_plural = '队伍'


class Round(models.Model):
    round = models.IntegerField(verbose_name='轮数', default=1)

    @classmethod
    def get_round(cls):
        if not len(cls.objects.all()):
            r = Round(round=1)
            r.save()
        return cls.objects.all()[0].round

    @classmethod
    def set_round(cls, _round):
        r = cls.objects.all()[0]
        r.round = _round
        r.save()

    def __str__(self):
        return '第%s轮' % str(self.round)

    class Meta:
        verbose_name = '当前轮数'
        verbose_name_plural = '当前轮数'



