<?php
namespace Addons\FunFest\Controller;

use Home\Controller\AddonsController;
use School\Redrock;

class IndexController extends AddonsController
{
    private $appid = 'wx81a4a4b77ec98ff4';
    private $token = 'gh_68f0a1ffc303';
    /*
    * 首页
    */
    public function index()
    {
        $this->check();
        $this->game();
        $this->display();
    }

    /*
    * 进入游戏设置
    */
    protected function game()
    {
        $modelInfoCg = M('funfest_js')->where('stunum='.session('stuId'))->find();
        if (!$modelInfoCg) {
            $arr1 = array(
                'stunum'   => session('stuId'),
                'nickname' => session('nickname'),
                'openid'   => session('openId'),
                'score'    => 0
                );
            $a = M('funfest_cg')->add($arr1);
            M('funfest_js')->add($arr1);
        }
    }
    public function passone()
    {

        $this->display();
        
    }
    public function time() 
    {

        $this->display();
    }
    public function passtwo()
    {
        $this->display();
    }
    public function passthree()
    {
        $this->display();
    }

    /*
     * 获取排名
     */
    public function rank()
    {
        $this->display();
    }

    public function showAfter()
    {
        //session('stuId',2015210977);
        $js = $this->fzorder('funfest_js');
        $cg = $this->fzorder('funfest_cg');
        $this->jsonReturn(200,'success',array(
            'js' => $js,
            'cg' => $cg
            )
        );
    }
    /*
    * 更新信息
    */
    public function updateScore()
    {
        session('stuId',2015210977);
        $score = I('post.score');
        $style = I('post.style');
        $time = I('post.time');
       if ($score) {
            switch ($style) {
                case 'js':
                    $arr = array(
                        'score'  => $score,
                        'time'   => $time
                         );
                    $this->oneRank('funfest_js', $arr, $score);
                    break;
                case 'cg':
                    $arr = array(
                        'score'  => $score,
                        'time'   => $time,
                        'stage'  => I('post.stage')
                         );
                    $this->oneRank('funfest_cg', $arr, $score, $time);
                    break;  
            }

       }
    }

    

    /*
     * 身份验证
     */
    protected function check()
    {
        if(!session('openId')){
            $map['token'] = $this->token;
            $info = M('member_public')->where($map)->find();
            if (I('get.code')) {
                $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?&appid=' . $info ['appid'] . '&secret=' . $info ['secret'] . '&code=' . I('get.code') . '&grant_type=authorization_code';
                $content = file_get_contents($url);
                $content = json_decode($content, true);
                $openId = $content['openid'];
            } else {
                $redirect_uri = addons_url('FunFest://index/index');
                $redirect_uri = urlencode($redirect_uri);
                $location = 
                    // 'http://hongyan.cqupt.edu.cn/GetWeixinCode/get-weixin-code.html?appid='
                    'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                    .$info['appid'].
                    '&redirect_uri='
                    .$redirect_uri.
                    '&response_type=code&scope=snsapi_userinfo&state=fuckweixin#wechat_redirect';
                redirect($location);
            }
            $redrock = new Redrock($openId);
            $stuId = $redrock->stuId();
            if (!$stuId) {
                if ($openId == -1) {
                    $this->error('请用微信客户端登录');
                } else {
                    $this->redirect(addons_url('Bind://Bind/bind'));
                }
            }
            $stuInfo = $this->getStuDetail($openId);
            $fansInfo = $this->getFansInfo($openId);
            session('nickname', $fansInfo['nickname']);
            session('realname', $stuInfo['realname']);
            session('stuId', $stuId);
            session('openId', $openId);
      }  
    }

    /*
    * 排名封装
    */
    protected function fzorder($funfest) 
    {
        $model = M($funfest);
        $score = $model->where('stunum='.session('stuId'))->getField('score');
        if ($funfest == 'funfest_cg') {
            $time = $model->where('stunum='.session('stuId'))->getField('time');
            $select = $model->field('score, nickname, stunum')->order('score desc, time')->limit()->select();
            foreach ($select as $key => $value) {
                if ($value['stunum'] == session('stuId')) {
                    $rank = $key + 1;
                    break;
                }
            }
        } else {
            $select = $model->field('score,nickname,stunum')->order('score desc')->select();
            foreach ($select as $key => $value) {
                if ($value['stunum'] == session('stuId')) {
                    $rank = $key + 1;
                    break;
                }
            }
        }
        return array(
                'data'      => $select,
                'rank'      => $rank,
                'myScore'   => $score
            );
    
        
    }

    /*
    * 最好成绩和排名
    */
    protected function oneRank($funfest, $arr , $score, $time = '') 
    {
        $model = M($funfest);
        
        $oldScore = $model->where('stunum='.session('stuId'))->getField('score');
        $status = $oldScore <= $score;
        if ($status) {
            $record = $model->where('stunum='.session('stuId'))->save($arr);
            $logSql = M($funfest)->getLastSql();
            $arrLog = array(
                'time' => date("Y-m-d H:i:s",time()),
                'sql'  => $logSql,
                'user' => session('stuId')
            );
            M('funfest_log')->add($arrLog);
            if ($time) {
                $select = $model->field('score, nickname, stunum')->order('score desc, time')->limit()->select();
                foreach ($select as $key => $value) {
                    if ($value['stunum'] == session('stuId')) {
                        $rank = $key + 1;
                        break;
                    }
                }
            } else {
                $select = $model->field('score, nickname, stunum')->order('score desc, time')->limit()->select();
                foreach ($select as $key => $value) {
                    if ($value['stunum'] == session('stuId')) {
                        $rank = $key + 1;
                        break;
                    }
                }
            }
            if ($record === false || $rank === false) {
                $this->jsonReturn(400, '失败');
            } else {
                $this->jsonReturn(200, '成功',array(
                        'rank'  => $rank,
                        'HighScore' => $score
                    ));
            }
        } else {
            $rank = $model->where('score>'.$oldScore)->count() + 1;
            if ($rank === false) {
                $this->jsonReturn(400, '失败');
            } else {
                $this->jsonReturn(200, '成功',array(
                        'rank'  => $rank,
                        'HighScore' => $oldScore
                    ));
            }
        }
    }

    /*
    * json返回格式
    */
    protected function jsonReturn($status,$message,$data=array())
    {
        exit(
        json_encode(array(
                'status' => $status,
                'message' => $message,
                'data' => $data
            )
        ));
    }
}
http://mp.weixin.qq.com/wiki/4/9ac2e7b1f1d22e9e57260f6553822520.html